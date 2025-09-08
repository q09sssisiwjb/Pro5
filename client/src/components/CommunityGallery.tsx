import { useState } from 'react';

const initialGalleryItems = [
  {
    id: 1,
    title: "Cosmic Dreamscape",
    author: "artist_ai",
    category: "Digital Art",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "AI-generated digital artwork"
  },
  {
    id: 2,
    title: "Future Vision",
    author: "creative_mind",
    category: "Portrait",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "AI-generated portrait art"
  },
  {
    id: 3,
    title: "Neural Networks",
    author: "techno_artist",
    category: "Abstract",
    image: "https://images.unsplash.com/photo-1549317336-206569e8475c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "Abstract AI-generated art"
  },
  {
    id: 4,
    title: "Mountain Dreams",
    author: "nature_ai",
    category: "Landscape",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "Nature-inspired AI artwork"
  },
  {
    id: 5,
    title: "Cyber City",
    author: "future_vision",
    category: "Sci-Fi",
    image: "https://pixabay.com/get/g95a38e8afcdac28f094437cb5734ed465ea2da603d05ce8748ed3910e0e2fc279304019e99ed1b2a0fe3fe847b76b0a78a4cbee7ba667185d9124d69b3859eda_1280.jpg",
    alt: "Futuristic AI cityscape"
  },
  {
    id: 6,
    title: "Pencil Portrait",
    author: "sketch_master",
    category: "Sketch",
    image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "AI-generated artistic sketch"
  },
  {
    id: 7,
    title: "Magic Realm",
    author: "fantasy_ai",
    category: "Fantasy",
    image: "https://pixabay.com/get/g24af1bd2c8d819b0a3c8753112500320d17e6751de7955880b015ba9af09d6e8c01604d1e31e71077d5c7d8934502b3006d037810726dbe00d23cb014d1a4245_1280.jpg",
    alt: "Fantasy AI artwork"
  },
  {
    id: 8,
    title: "Pure Geometry",
    author: "minimal_ai",
    category: "Minimal",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=600",
    alt: "Minimalist AI design"
  }
];

const CommunityGallery = () => {
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [loading, setLoading] = useState(false);

  const loadMoreItems = () => {
    setLoading(true);
    // Simulate loading more items
    setTimeout(() => {
      const newItems = initialGalleryItems.map(item => ({
        ...item,
        id: item.id + galleryItems.length,
        title: `${item.title} (New)`
      }));
      setGalleryItems([...galleryItems, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Digital Art': 'bg-primary/20 text-primary',
      'Portrait': 'bg-secondary/20 text-secondary',
      'Abstract': 'bg-accent/20 text-accent',
      'Landscape': 'bg-primary/20 text-primary',
      'Sci-Fi': 'bg-secondary/20 text-secondary',
      'Sketch': 'bg-accent/20 text-accent',
      'Fantasy': 'bg-primary/20 text-primary',
      'Minimal': 'bg-secondary/20 text-secondary'
    };
    return colors[category as keyof typeof colors] || 'bg-primary/20 text-primary';
  };

  return (
    <section id="gallery" className="pt-0 pb-16 bg-muted/20" data-testid="gallery-section">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4" data-testid="gallery-title">
            Community Creations
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12 animate-slide-in">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="group relative aspect-square bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              data-testid={`gallery-item-${item.id}`}
            >
              <img 
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                data-testid={`gallery-image-${item.id}`}
              />
              <div className="absolute inset-0 bg-gallery-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <span 
                    className={`px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block ${getCategoryColor(item.category)}`}
                    data-testid={`gallery-category-${item.id}`}
                  >
                    {item.category}
                  </span>
                  <h3 
                    className="text-white font-semibold mb-1"
                    data-testid={`gallery-title-${item.id}`}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-gray-200 text-sm"
                    data-testid={`gallery-author-${item.id}`}
                  >
                    by @{item.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={loadMoreItems}
            disabled={loading}
            className="bg-gradient-purple-pink hover:opacity-90 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            data-testid="button-load-more"
          >
            {loading ? 'Loading...' : 'Load More Creations'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunityGallery;
