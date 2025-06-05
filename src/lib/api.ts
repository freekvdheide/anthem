import { supabase } from './supabase'

// Interface voor frontend compatibility met bestaande types
export interface Product {
  id: number
  name: string
  href: string
  imageSrc: string
  imageAlt: string
  price: string
  color: string
}

export interface ProductData {
  id: number
  name: string
  price: string
  href: string
  description: string
  images: Array<{
    src: string
    alt: string
  }>
  colors: Array<{
    name: string
    class: string
    selectedClass: string
  }>
  sizes: Array<{
    name: string
    inStock: boolean
  }>
  highlights: string[]
  details: string
  breadcrumbs: Array<{
    id: number
    name: string
    href: string
  }>
}

export interface ReviewData {
  href: string
  average: number
  totalCount: number
  featured: Array<{
    id: number
    title: string
    rating: number
    content: string
    author: string
    avatarSrc: string
  }>
}

// Helper function to format price
const formatPrice = (price: number): string => `$${price.toFixed(0)}`

// Helper function to map database color to CSS classes
const getColorClasses = (color: string) => {
  const colorMap: Record<string, { class: string; selectedClass: string }> = {
    'Black': { class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    'Aspen White': { class: 'bg-white', selectedClass: 'ring-gray-400' },
    'White': { class: 'bg-white', selectedClass: 'ring-gray-400' },
    'Charcoal': { class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    'Gray': { class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    'Mixed Colors': { class: 'bg-gradient-to-r from-gray-900 via-white to-gray-200', selectedClass: 'ring-gray-400' },
  }
  
  return colorMap[color] || { class: 'bg-gray-200', selectedClass: 'ring-gray-400' }
}

// Fetch all related products
export async function getRelatedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('product_overview')
      .select('*')
      .eq('is_available', true)
      .limit(4)

    if (error) {
      console.error('Error fetching related products:', error)
      return []
    }

    return data.map((item): Product => ({
      id: item.variant_id || 0,
      name: item.product_name || '',
      href: `#product-${item.product_id}`,
      imageSrc: item.image_url || '',
      imageAlt: item.image_alt || '',
      price: formatPrice(item.price || 0),
      color: item.color || ''
    }))
  } catch (error) {
    console.error('Failed to fetch related products:', error)
    return []
  }
}

// Fetch main product with variants (Basic Tee 6-Pack)
export async function getMainProduct(productId: number = 2): Promise<ProductData | null> {
  try {
    console.log(`Fetching product data for product ID: ${productId}`)
    
    // Get product overview with all variants
    const { data: productData, error: productError } = await supabase
      .from('product_overview')
      .select('*')
      .eq('product_id', productId)
      .eq('is_available', true)

    if (productError) {
      console.error('Supabase error fetching product:', productError)
      return null
    }

    if (!productData || productData.length === 0) {
      console.error(`No product data found for product ID: ${productId}`)
      console.log('Available products:', await supabase.from('products').select('id, name'))
      return null
    }

    console.log(`Found ${productData.length} variants for product ${productId}`)

    const product = productData[0]
    
    // Get unique colors and sizes from variants
    const uniqueColors = [...new Set(productData.map(p => p.color))]
    const uniqueSizes = [...new Set(productData.map(p => p.size))]
    
    console.log('Unique colors:', uniqueColors)
    console.log('Unique sizes:', uniqueSizes)
    
    // Map colors to UI format
    const colors = uniqueColors.map(color => ({
      name: color || '',
      ...getColorClasses(color || '')
    }))

    // Map sizes to UI format with stock check
    const sizes = uniqueSizes.map(size => {
      const sizeVariants = productData.filter(p => p.size === size)
      const inStock = sizeVariants.some(v => (v.stock_quantity || 0) > 0)
      
      return {
        name: size || '',
        inStock
      }
    })

    // Get product images from first few variants
    const images = productData.slice(0, 4).map(p => ({
      src: p.image_url || '',
      alt: p.image_alt || ''
    }))

    return {
      id: product.product_id || 0,
      name: product.product_name || '',
      price: formatPrice(product.base_price || 0),
      href: `#product-${product.product_id}`,
      description: product.description || '',
      images,
      colors,
      sizes,
      highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors', 
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton'
      ],
      details: product.description || '',
      breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' }
      ]
    }
  } catch (error) {
    console.error('Exception in getMainProduct:', error)
    return null
  }
}

// Fetch product reviews
export async function getProductReviews(productId: number = 2): Promise<ReviewData> {
  try {
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('product_reviews')
      .select(`
        *,
        customers (
          first_name,
          last_name
        )
      `)
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .limit(3)

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError)
    }

    // Calculate average rating
    const { data: ratingData } = await supabase
      .from('product_overview')
      .select('avg_rating, review_count')
      .eq('product_id', productId)
      .single()

    const average = ratingData?.avg_rating || 0
    const totalCount = ratingData?.review_count || 0

    // Format featured reviews
    const featured = (reviewsData || []).map((review, index) => ({
      id: review.id,
      title: `Review from ${review.customers?.first_name || 'Customer'}`,
      rating: review.rating || 5,
      content: `<p>${review.review_text || 'Great product!'}</p>`,
      author: `${review.customers?.first_name || 'Anonymous'} ${review.customers?.last_name || ''}`.trim(),
      avatarSrc: `https://images.unsplash.com/photo-${['1519244703995-f4e0f30006d5', '1520785643438-5bf77931f493', '1531427186611-ecfd6d936c79'][index] || '1519244703995-f4e0f30006d5'}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
    }))

    return {
      href: '#reviews',
      average: Math.round(average * 10) / 10,
      totalCount,
      featured
    }
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return {
      href: '#reviews',
      average: 4,
      totalCount: 0,
      featured: []
    }
  }
}

// Search products by name or color
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('product_overview')
      .select('*')
      .eq('is_available', true)
      .or(`product_name.ilike.%${query}%,color.ilike.%${query}%`)
      .limit(10)

    if (error) {
      console.error('Error searching products:', error)
      return []
    }

    return data.map((item): Product => ({
      id: item.variant_id || 0,
      name: item.product_name || '',
      href: `#product-${item.product_id}`,
      imageSrc: item.image_url || '',
      imageAlt: item.image_alt || '',
      price: formatPrice(item.price || 0),
      color: item.color || ''
    }))
  } catch (error) {
    console.error('Failed to search products:', error)
    return []
  }
} 