import type { Restaurant } from '../types'

export const restaurants: Restaurant[] = [
  {
    id: 'r001', name: 'Roadhouse Cafe', lat: 27.7128, lng: 85.3131, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Wood-Fired Pizza', 'Italian', 'Coffee'], rating: 4.7, priceRange: 'NPR 800-2000', phone: '+977-1-4422206', website: 'roadhousenepal.com',
    openHours: '8:00 AM - 11:00 PM', description: 'Famous wood-fired pizza in the heart of Thamel. A Kathmandu institution since 1995.',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop'
    ],
    tags: ['pizza', 'coffee', 'western', 'tourist'],
    surplusAvailable: true, surplusItems: ['Margherita Pizza x4', 'Garlic Bread x6', 'Tiramisu x3']
  },
  {
    id: 'r002', name: 'Roadhouse Cafe (Boudha)', lat: 27.7216, lng: 85.3620, address: 'Boudhanath, Kathmandu', area: 'Boudha', city: 'Kathmandu',
    cuisine: ['Wood-Fired Pizza', 'Italian', 'Coffee'], rating: 4.6, priceRange: 'NPR 800-2000', phone: '+977-1-4422206', website: 'roadhousenepal.com',
    openHours: '8:00 AM - 10:00 PM', description: 'Pizza with a view of Boudhanath Stupa.',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop'
    ],
    tags: ['pizza', 'coffee', 'western', 'stupa-view'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r003', name: 'Or2k', lat: 27.7141, lng: 85.3122, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Middle Eastern', 'Israeli', 'Vegetarian'], rating: 4.5, priceRange: 'NPR 500-1500', phone: '+977-1-4418499', website: 'or2k.com',
    openHours: '10:00 AM - 10:00 PM', description: 'Middle Eastern and Israeli cuisine with excellent falafel and hummus. Colorful bohemian decor.',
    images: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1543339308-d595c4f4cbb3?w=600&h=400&fit=crop'
    ],
    tags: ['vegetarian', 'middle-eastern', 'healthy'],
    surplusAvailable: true, surplusItems: ['Falafel Platter x6', 'Hummus x4', 'Pita Bread x8']
  },
  {
    id: 'r004', name: 'Le Sherpa', lat: 27.7172, lng: 85.3204, address: 'Jhamsikhel, Lalitpur', area: 'Jhamsikhel', city: 'Lalitpur',
    cuisine: ['French', 'Nepali Fusion', 'Coffee'], rating: 4.6, priceRange: 'NPR 600-1800', phone: '+977-1-5553456', website: 'lesherpa.com.np',
    openHours: '7:30 AM - 9:30 PM', description: 'French-inspired bakery and cafe with excellent pastries and coffee. Set in a beautiful garden estate.',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop'
    ],
    tags: ['bakery', 'coffee', 'french', 'pastries'],
    surplusAvailable: true, surplusItems: ['Croissants x10', 'Pain au Chocolat x6', 'Baguette x4']
  },
  {
    id: 'r005', name: 'Cuppa Boll', lat: 27.7153, lng: 85.3218, address: 'Jhamsikhel, Lalitpur', area: 'Jhamsikhel', city: 'Lalitpur',
    cuisine: ['Coffee', 'Tea', 'Snacks'], rating: 4.5, priceRange: 'NPR 200-800', phone: '+977-1-5520456', website: '',
    openHours: '7:00 AM - 8:00 PM', description: 'Cozy coffee shop popular with locals and expats.',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop'
    ],
    tags: ['coffee', 'tea', 'cozy', 'local'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r006', name: 'Riverside Cafe', lat: 27.6845, lng: 85.3252, address: 'Kupondole, Lalitpur', area: 'Kupondole', city: 'Lalitpur',
    cuisine: ['Cafe', 'Continental', 'Pizza'], rating: 4.2, priceRange: 'NPR 400-1200', phone: '+977-1-5520888', website: '',
    openHours: '8:00 AM - 9:00 PM', description: 'Riverside cafe with a relaxed atmosphere and decent coffee.',
    images: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop'
    ],
    tags: ['riverside', 'coffee', 'relaxed'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r007', name: 'Cafe de Patan', lat: 27.6723, lng: 85.3252, address: 'Patan Durbar Square, Lalitpur', area: 'Patan', city: 'Lalitpur',
    cuisine: ['Nepali', 'Newari', 'Coffee'], rating: 4.3, priceRange: 'NPR 300-1000', phone: '+977-1-5522334', website: '',
    openHours: '9:00 AM - 7:00 PM', description: 'Enjoy coffee with a view of Patan Durbar Square.',
    images: [
      'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop'
    ],
    tags: ['heritage', 'coffee', 'newari'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r008', name: 'Gyumri', lat: 27.6680, lng: 85.3270, address: 'Patan, Lalitpur', area: 'Patan', city: 'Lalitpur',
    cuisine: ['Armenian', 'Middle Eastern', 'Nepali'], rating: 4.4, priceRange: 'NPR 500-1500', phone: '+977-1-5534567', website: '',
    openHours: '11:00 AM - 10:00 PM', description: 'Unique Armenian cuisine in a beautiful courtyard setting.',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1543339308-d595c4f4cbb3?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
    ],
    tags: ['armenian', 'unique', 'courtyard'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r009', name: 'Himalayan Java', lat: 27.7088, lng: 85.3173, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Coffee', 'Tea', 'Pastries', 'Continental'], rating: 4.3, priceRange: 'NPR 300-1200', phone: '+977-1-4424567', website: 'himalayanjava.com',
    openHours: '7:00 AM - 9:00 PM', description: "Nepal's leading coffee chain with excellent espresso.",
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop'
    ],
    tags: ['coffee-chain', 'reliable', 'wifi'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r010', name: 'Fire and Ice', lat: 27.7100, lng: 85.3110, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Pizza', 'Italian', 'Ice Cream'], rating: 4.5, priceRange: 'NPR 600-1500', phone: '+977-1-4423456', website: '',
    openHours: '11:00 AM - 11:00 PM', description: 'Famous for wood-fired pizza and homemade ice cream.',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop'
    ],
    tags: ['pizza', 'ice-cream', 'family-friendly'],
    surplusAvailable: true, surplusItems: ['Pepperoni Pizza x3', 'Caesar Salad x4', 'Gelato x6']
  },
  {
    id: 'r011', name: 'Chhaya Center Food Court', lat: 27.7125, lng: 85.3140, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Multi-cuisine', 'Nepali', 'Chinese'], rating: 4.0, priceRange: 'NPR 200-800', phone: '', website: '',
    openHours: '10:00 AM - 10:00 PM', description: 'Bustling food court with multiple vendors and budget-friendly options.',
    images: [
      'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop'
    ],
    tags: ['food-court', 'budget', 'variety'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r012', name: 'Tamarind', lat: 27.6840, lng: 85.3120, address: 'Jawalakhel, Lalitpur', area: 'Jawalakhel', city: 'Lalitpur',
    cuisine: ['Nepali', 'Indian', 'Tandoori'], rating: 4.4, priceRange: 'NPR 500-1500', phone: '+977-1-5521234', website: '',
    openHours: '11:30 AM - 10:00 PM', description: 'Authentic Nepali and Indian cuisine with excellent tandoori.',
    images: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop'
    ],
    tags: ['nepali', 'indian', 'tandoori'],
    surplusAvailable: true, surplusItems: ['Butter Chicken x5', 'Naan x10', 'Dal Makhani x4']
  },
  {
    id: 'r013', name: 'Artisan', lat: 27.6910, lng: 85.3100, address: 'Lazimpat, Kathmandu', area: 'Lazimpat', city: 'Kathmandu',
    cuisine: ['Italian', 'Continental', 'Coffee'], rating: 4.6, priceRange: 'NPR 700-2000', phone: '+977-1-4416789', website: '',
    openHours: '8:00 AM - 10:00 PM', description: 'Artisanal cafe with excellent pasta and specialty coffee.',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop'
    ],
    tags: ['italian', 'artisan', 'upscale'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r014', name: 'Neer Cafe', lat: 27.6820, lng: 85.3240, address: 'Kupondole, Lalitpur', area: 'Kupondole', city: 'Lalitpur',
    cuisine: ['Cafe', 'Breakfast', 'Brunch'], rating: 4.5, priceRange: 'NPR 300-1000', phone: '+977-1-5527890', website: '',
    openHours: '7:30 AM - 6:00 PM', description: 'Popular brunch spot with riverside seating.',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop'
    ],
    tags: ['brunch', 'riverside', 'breakfast'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r015', name: 'Buena Vista Social Club', lat: 27.7150, lng: 85.3160, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Cuban', 'Caribbean', 'Cocktails'], rating: 4.3, priceRange: 'NPR 600-1800', phone: '+977-1-4429012', website: '',
    openHours: '5:00 PM - 11:00 PM', description: 'Cuban-themed bar with live music and cocktails.',
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop'
    ],
    tags: ['bar', 'music', 'cocktails', 'nightlife'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r016', name: 'Yangling Tibetan Restaurant', lat: 27.7120, lng: 85.3115, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Tibetan', 'Nepali', 'Momos'], rating: 4.4, priceRange: 'NPR 200-800', phone: '+977-1-4422345', website: '',
    openHours: '8:00 AM - 10:00 PM', description: 'Famous for momos and thukpa. A Thamel classic.',
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=400&fit=crop'
    ],
    tags: ['tibetan', 'momos', 'budget', 'classic'],
    surplusAvailable: true, surplusItems: ['Chicken Momos x12', 'Thukpa x6', 'Fried Rice x4']
  },
  {
    id: 'r017', name: 'Third Eye Restaurant', lat: 27.7145, lng: 85.3145, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Nepali', 'Indian', 'Tibetan'], rating: 4.3, priceRange: 'NPR 300-1000', phone: '+977-1-4423456', website: '',
    openHours: '9:00 AM - 10:00 PM', description: 'Multi-cuisine restaurant with rooftop seating and mountain views.',
    images: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
    ],
    tags: ['rooftop', 'multi-cuisine', 'mountain-view'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r018', name: 'Nepali Chulo', lat: 27.7160, lng: 85.3155, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Nepali', 'Newari', 'Thakali'], rating: 4.2, priceRange: 'NPR 500-1200', phone: '+977-1-4426789', website: '',
    openHours: '11:00 AM - 10:00 PM', description: 'Traditional Nepali cuisine with cultural performances.',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop'
    ],
    tags: ['traditional', 'nepali', 'cultural', 'thakali'],
    surplusAvailable: true, surplusItems: ['Dal Bhat x8', 'Newari Set x5', 'Sel Roti x10']
  },
  {
    id: 'r019', name: 'Bika Bakery', lat: 27.7130, lng: 85.3105, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Bakery', 'Pastries', 'Coffee'], rating: 4.4, priceRange: 'NPR 150-600', phone: '+977-1-4421234', website: '',
    openHours: '6:30 AM - 7:00 PM', description: 'Freshly baked bread, pastries, and excellent croissants.',
    images: [
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop'
    ],
    tags: ['bakery', 'pastries', 'breakfast', 'cheap'],
    surplusAvailable: true, surplusItems: ['Croissants x12', 'Muffins x8', 'Sandwiches x6']
  },
  {
    id: 'r020', name: 'Imago Galleries Cafe', lat: 27.6900, lng: 85.3130, address: 'Lazimpat, Kathmandu', area: 'Lazimpat', city: 'Kathmandu',
    cuisine: ['Cafe', 'Continental', 'Art Gallery'], rating: 4.5, priceRange: 'NPR 400-1200', phone: '+977-1-4418901', website: '',
    openHours: '9:00 AM - 6:00 PM', description: 'Cafe inside an art gallery. Unique atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop'
    ],
    tags: ['art', 'gallery', 'unique', 'quiet'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r021', name: 'Kathmandu Kitchen', lat: 27.7155, lng: 85.3165, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Nepali', 'Indian', 'Continental'], rating: 4.1, priceRange: 'NPR 400-1200', phone: '+977-1-4425678', website: '',
    openHours: '10:00 AM - 10:00 PM', description: 'Solid all-rounder with good value Nepali thalis.',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&h=400&fit=crop'
    ],
    tags: ['thali', 'budget', 'nepali', 'reliable'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r022', name: 'Jatra Cafe', lat: 27.6710, lng: 85.3260, address: 'Patan, Lalitpur', area: 'Patan', city: 'Lalitpur',
    cuisine: ['Cafe', 'Nepali', 'Newari'], rating: 4.3, priceRange: 'NPR 300-800', phone: '+977-1-5523456', website: '',
    openHours: '8:00 AM - 7:00 PM', description: 'Newari-style cafe in a restored heritage building.',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop'
    ],
    tags: ['heritage', 'newari', 'cafe', 'patan'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r023', name: 'Basantapur Art Cafe', lat: 27.7047, lng: 85.3075, address: 'Basantapur, Kathmandu', area: 'Basantapur', city: 'Kathmandu',
    cuisine: ['Cafe', 'Nepali', 'Art'], rating: 4.2, priceRange: 'NPR 250-700', phone: '+977-1-4256789', website: '',
    openHours: '9:00 AM - 6:00 PM', description: 'Cafe with local art on the walls and good Nepali coffee.',
    images: [
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop'
    ],
    tags: ['art', 'local', 'coffee', 'Kathmandu'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r024', name: 'Dunga Restaurant', lat: 27.6780, lng: 85.3280, address: 'Lagankhel, Lalitpur', area: 'Lagankhel', city: 'Lalitpur',
    cuisine: ['Nepali', 'Newari', 'Bar'], rating: 4.1, priceRange: 'NPR 400-1200', phone: '+977-1-5524567', website: '',
    openHours: '11:00 AM - 10:00 PM', description: 'Authentic Newari food in a local setting.',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop'
    ],
    tags: ['newari', 'authentic', 'local', 'bar'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r025', name: 'Silver Oak Garden Restaurant', lat: 27.7050, lng: 85.3000, address: 'Balaju, Kathmandu', area: 'Balaju', city: 'Kathmandu',
    cuisine: ['Nepali', 'Continental', 'Garden'], rating: 4.0, priceRange: 'NPR 500-1500', phone: '+977-1-4356789', website: '',
    openHours: '10:00 AM - 10:00 PM', description: 'Garden restaurant with outdoor seating and varied menu.',
    images: [
      'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop'
    ],
    tags: ['garden', 'outdoor', 'family', 'balaju'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r026', name: 'Manaslu Restaurant', lat: 27.7138, lng: 85.3128, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Nepali', 'Tibetan', 'Momos'], rating: 4.2, priceRange: 'NPR 250-800', phone: '+977-1-4422890', website: '',
    openHours: '8:00 AM - 10:00 PM', description: 'Budget-friendly Nepali and Tibetan food. Great momos.',
    images: [
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=600&h=400&fit=crop'
    ],
    tags: ['momos', 'budget', 'tibetan', 'nepali'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r027', name: 'Sapha Bazaar Food Hub', lat: 27.6890, lng: 85.3180, address: 'Kupondole, Lalitpur', area: 'Kupondole', city: 'Lalitpur',
    cuisine: ['Multi-cuisine', 'Nepali', 'Chinese', 'Fast Food'], rating: 3.9, priceRange: 'NPR 150-600', phone: '', website: '',
    openHours: '10:00 AM - 9:00 PM', description: 'Food hub with multiple stalls. Good for groups with different tastes.',
    images: [
      'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop'
    ],
    tags: ['food-hub', 'budget', 'variety', 'group'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r028', name: 'Pharping Cafe', lat: 27.5870, lng: 85.2830, address: 'Pharping, Kathmandu', area: 'Pharping', city: 'Kathmandu',
    cuisine: ['Cafe', 'Nepali', 'Organic'], rating: 4.1, priceRange: 'NPR 200-700', phone: '+977-1-5561234', website: '',
    openHours: '8:00 AM - 5:00 PM', description: 'Organic cafe near the Pharping monasteries.',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop'
    ],
    tags: ['organic', 'pharping', 'monastery', 'quiet'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r029', name: 'Rum Doodle', lat: 27.7122, lng: 85.3135, address: 'Thamel, Kathmandu', area: 'Thamel', city: 'Kathmandu',
    cuisine: ['Continental', 'Pizza', 'Bar'], rating: 4.3, priceRange: 'NPR 600-1800', phone: '+977-1-4424567', website: '',
    openHours: '10:00 AM - 11:00 PM', description: 'Classic Thamel bar-restaurant with a fun atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop'
    ],
    tags: ['bar', 'pizza', 'thamel', 'nightlife'],
    surplusAvailable: false, surplusItems: []
  },
  {
    id: 'r030', name: 'Attic Cafe', lat: 27.7168, lng: 85.3208, address: 'Jhamsikhel, Lalitpur', area: 'Jhamsikhel', city: 'Lalitpur',
    cuisine: ['Cafe', 'Coffee', 'Pastries'], rating: 4.4, priceRange: 'NPR 250-700', phone: '+977-1-5554567', website: '',
    openHours: '7:30 AM - 7:00 PM', description: 'Quiet upstairs cafe, perfect for working or reading.',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&h=400&fit=crop'
    ],
    tags: ['quiet', 'work-friendly', 'jhamsikhel', 'coffee'],
    surplusAvailable: false, surplusItems: []
  }
]
