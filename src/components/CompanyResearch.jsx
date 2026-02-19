import { useState } from 'react'
import './CompanyResearch.css'

const COMPANY_DATA = {
  spotify: {
    name: 'Spotify',
    description: 'Spotify is a Swedish audio streaming and media services provider, founded in 2006. It is the world\'s largest music streaming service provider, with over 600 million monthly active users, including 236 million paying subscribers.',
    news: [
      { title: 'Spotify expands podcast offerings with new AI features', url: 'https://newsroom.spotify.com' },
      { title: 'Spotify reports strong Q4 growth in premium subscribers', url: 'https://investors.spotify.com' },
      { title: 'New music discovery tools launched for artists', url: 'https://artists.spotify.com' },
    ],
    products: [
      'Spotify Free (ad-supported streaming)',
      'Spotify Premium (ad-free streaming)',
      'Spotify for Artists (analytics and promotion tools)',
      'Spotify Podcasts (original and exclusive content)',
      'Spotify Audiobooks',
    ],
    tips: [
      'Understand their freemium business model and how they balance user growth with monetization',
      'Be familiar with their podcast strategy and how it differs from music streaming',
      'Know their key metrics: MAU, Premium subscribers, ARPU, and churn rate',
      'Research their competition with Apple Music, YouTube Music, and Amazon Music',
      'Understand their data-driven approach to music recommendations and personalization',
    ],
    size: '8,000+ employees',
    location: 'Stockholm, Sweden (HQ) | Global offices',
  },
  amazon: {
    name: 'Amazon',
    description: 'Amazon is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence. It is one of the Big Five American technology companies.',
    news: [
      { title: 'Amazon Web Services announces new AI capabilities', url: 'https://aws.amazon.com/news' },
      { title: 'Amazon Prime Video expands original content library', url: 'https://www.amazon.com/prime' },
      { title: 'Amazon launches new sustainability initiatives', url: 'https://sustainability.aboutamazon.com' },
    ],
    products: [
      'Amazon.com (e-commerce marketplace)',
      'Amazon Web Services (AWS) - cloud computing',
      'Amazon Prime (membership program)',
      'Amazon Alexa & Echo devices',
      'Amazon Prime Video (streaming service)',
      'Amazon Fresh & Whole Foods (grocery)',
    ],
    tips: [
      'Understand their "Day 1" philosophy and customer obsession principle',
      'Know their leadership principles - be ready to discuss examples',
      'Research their two-pizza team structure and how they organize teams',
      'Understand their data-driven decision-making culture',
      'Be familiar with their working backwards process (press release method)',
      'Know their key metrics: customer satisfaction, operational efficiency, and innovation velocity',
    ],
    size: '1.5+ million employees globally',
    location: 'Seattle, Washington (HQ) | Global presence',
  },
  shopify: {
    name: 'Shopify',
    description: 'Shopify is a Canadian multinational e-commerce company headquartered in Ottawa, Ontario. It is the name of its proprietary e-commerce platform for online stores and retail point-of-sale systems.',
    news: [
      { title: 'Shopify introduces new AI-powered merchant tools', url: 'https://www.shopify.com/blog' },
      { title: 'Shopify partners with major social media platforms for commerce', url: 'https://www.shopify.com/partners' },
      { title: 'New fulfillment network expansion announced', url: 'https://www.shopify.com/fulfillment' },
    ],
    products: [
      'Shopify E-commerce Platform',
      'Shopify POS (Point of Sale)',
      'Shopify Payments',
      'Shopify Fulfillment Network',
      'Shopify Plus (enterprise solution)',
      'Shopify App Store',
    ],
    tips: [
      'Understand their merchant-first approach and how they empower entrepreneurs',
      'Know their key metrics: GMV (Gross Merchandise Volume), MRR (Monthly Recurring Revenue), and merchant growth',
      'Research their competition with WooCommerce, BigCommerce, and Squarespace',
      'Understand their platform ecosystem and app marketplace model',
      'Be familiar with their focus on making commerce better for everyone',
      'Know how they balance simplicity for small merchants with power for enterprise clients',
    ],
    size: '10,000+ employees',
    location: 'Ottawa, Canada (HQ) | Global offices',
  },
  ebay: {
    name: 'eBay',
    description: 'eBay Inc. is an American multinational e-commerce corporation based in San Jose, California, that facilitates consumer-to-consumer and business-to-consumer sales through its website.',
    news: [
      { title: 'eBay launches new authentication service for luxury items', url: 'https://www.ebayinc.com/news' },
      { title: 'Enhanced seller tools and analytics dashboard released', url: 'https://www.ebay.com/seller-center' },
      { title: 'eBay expands into new international markets', url: 'https://www.ebayinc.com/company' },
    ],
    products: [
      'eBay Marketplace (C2C and B2C platform)',
      'eBay Motors (automotive marketplace)',
      'eBay Classifieds',
      'eBay Managed Payments',
      'eBay Authenticity Guarantee',
    ],
    tips: [
      'Understand their marketplace model and how they facilitate transactions between buyers and sellers',
      'Know their key metrics: GMV, active buyers, active sellers, and take rate',
      'Research their competition with Amazon Marketplace, Mercari, and Facebook Marketplace',
      'Understand their focus on collectibles, unique items, and "unboxing" experiences',
      'Be familiar with their trust and safety initiatives',
      'Know how they differentiate from Amazon (auction vs. fixed price, unique items vs. new products)',
    ],
    size: '13,000+ employees',
    location: 'San Jose, California (HQ) | Global offices',
  },
  proof: {
    name: 'Proof',
    description: 'Proof is a B2B SaaS company focused on helping businesses build better products through user research and validation. They provide tools and services for product managers and teams to make data-driven decisions.',
    news: [
      { title: 'Proof raises Series A funding to expand research platform', url: 'https://www.proof.com/news' },
      { title: 'New AI-powered insights feature launched', url: 'https://www.proof.com/product-updates' },
      { title: 'Proof partners with major product management communities', url: 'https://www.proof.com/partners' },
    ],
    products: [
      'User Research Platform',
      'Validation Tools',
      'Customer Interview Software',
      'Research Analytics Dashboard',
      'Integration Marketplace',
    ],
    tips: [
      'Understand their focus on helping PMs make better decisions through research',
      'Know their target customer: product managers, researchers, and product teams',
      'Research their competition with UserTesting, Dovetail, and Maze',
      'Understand their B2B SaaS model and how they differentiate',
      'Be familiar with modern product management practices and research methodologies',
      'Know how they help teams balance speed with quality in product development',
    ],
    size: '50-200 employees',
    location: 'San Francisco, California (HQ) | Remote-first',
  },
}

function CompanyResearch() {
  const [companyName, setCompanyName] = useState('')
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleResearch = () => {
    const normalizedInput = companyName.trim().toLowerCase()
    
    if (!normalizedInput) {
      setError('Please enter a company name')
      setSelectedCompany(null)
      return
    }

    setIsLoading(true)
    setError('')
    setSelectedCompany(null)

    // Simulate API call with loading state
    setTimeout(() => {
      const companyKey = Object.keys(COMPANY_DATA).find(
        (key) => key === normalizedInput || COMPANY_DATA[key].name.toLowerCase() === normalizedInput
      )

      setIsLoading(false)

      if (companyKey) {
        setSelectedCompany(COMPANY_DATA[companyKey])
        setError('')
      } else {
        setError(`Company "${companyName}" not found. Available companies: Spotify, Amazon, Shopify, eBay, or Proof`)
      }
    }, 800) // Simulate network delay
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleResearch()
    }
  }

  return (
    <div className="company-research">
      <div className="company-research-header">
        <h2 className="company-research-title">Company Research</h2>
        <p className="company-research-subtitle">Get insights and interview prep tips for top companies</p>
      </div>

      <div className="company-search">
        <input
          type="text"
          className="company-input"
          placeholder="Enter company name (e.g., Spotify, Amazon, Shopify)"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button 
          type="button" 
          className="company-search-btn" 
          onClick={handleResearch}
          disabled={isLoading}
        >
          {isLoading ? 'Researching...' : 'Research'}
        </button>
      </div>

      {isLoading && (
        <div className="company-loading">
          <div className="company-spinner"></div>
          <p className="company-loading-text">Researching {companyName}...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="company-error" role="alert">
          <span className="company-error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {selectedCompany && !isLoading && (
        <div className="company-results">
          <div className="company-card company-card-0">
            <h3 className="company-card-title">Company Overview</h3>
            <p className="company-description">{selectedCompany.description}</p>
            <div className="company-meta">
              <span className="company-meta-item">
                <strong>Size:</strong> {selectedCompany.size}
              </span>
              <span className="company-meta-item">
                <strong>Location:</strong> {selectedCompany.location}
              </span>
            </div>
          </div>

          <div className="company-card company-card-1">
            <h3 className="company-card-title">Recent News</h3>
            <ul className="company-news-list">
              {selectedCompany.news.map((item, index) => (
                <li key={index} className="company-news-item">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="company-news-link">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="company-card company-card-2">
            <h3 className="company-card-title">Key Products & Services</h3>
            <ul className="company-products-list">
              {selectedCompany.products.map((product, index) => (
                <li key={index} className="company-product-item">{product}</li>
              ))}
            </ul>
          </div>

          <div className="company-card company-card-3">
            <h3 className="company-card-title">Interview Prep Tips</h3>
            <ul className="company-tips-list">
              {selectedCompany.tips.map((tip, index) => (
                <li key={index} className="company-tip-item">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyResearch
