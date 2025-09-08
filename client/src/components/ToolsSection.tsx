const tools = [
  {
    id: 1,
    name: "BG Remover",
    description: "Remove backgrounds instantly",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
        <circle cx="9" cy="9" r="2"/>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
    )
  },
  {
    id: 2,
    name: "Text-to-Image",
    description: "Generate images from text",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
        <path d="m15 5 4 4"/>
      </svg>
    )
  },
  {
    id: 3,
    name: "Sketch",
    description: "Transform photos to sketches",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      </svg>
    )
  },
  {
    id: 4,
    name: "Upscaler",
    description: "Enhance image resolution",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.37 3.63a2.12 2.12 0 0 1 3 3L12 16l-4 1 1-4Z"/>
      </svg>
    )
  },
  {
    id: 5,
    name: "Image-to-Image",
    description: "Transform existing images",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="m3 11 4-4 4 4"/>
        <path d="m21 13-4 4-4-4"/>
        <path d="M7 11V7a2 2 0 0 1 2-2h2"/>
        <path d="M17 13v4a2 2 0 0 1-2 2h-2"/>
      </svg>
    )
  },
  {
    id: 6,
    name: "More Tools",
    description: "Discover additional features",
    icon: (
      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 12h8"/>
        <path d="M12 8v8"/>
      </svg>
    )
  }
];

const ToolsSection = () => {
  return (
    <section id="tools" className="pt-0 pb-0 bg-primary/5" data-testid="tools-section">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6"></div>

        <div className="flex flex-nowrap gap-3 overflow-x-auto">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className="flex-shrink-0 basis-1/4 sm:basis-1/5 md:basis-1/6 lg:basis-[12.5%]"
              data-testid={`tool-card-${tool.id}`}
            >
              <div 
                className="group relative cursor-pointer h-full transform-gpu perspective-1000"
                style={{
                  transform: 'rotateX(2deg) rotateY(-2deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Outer Container with Enhanced Gradient Border & Glow */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[hsla(253,100%,72%,0.2)] to-transparent group-hover:from-[hsla(253,100%,72%,0.4)] transition-all duration-100"
                  style={{ 
                    borderRadius: '0.75rem',
                    boxShadow: '0 0 10px hsla(253, 100%, 72%, 0.1), 0 4px 20px rgba(0, 0, 0, 0.3)',
                    filter: 'drop-shadow(0 0 8px hsla(253, 100%, 72%, 0.15))'
                  }}
                ></div>
                
                {/* Enhanced Glow on Hover */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-[hsla(253,100%,72%,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200 blur-sm"
                  style={{ 
                    borderRadius: '0.75rem',
                    transform: 'scale(1.1)'
                  }}
                ></div>
                
                {/* Inner Container with Enhanced 3D */}
                <div 
                  className="relative p-2 text-center space-y-1 h-full flex flex-col items-center justify-center transform group-hover:-translate-y-1 group-hover:rotate-1 transition-all duration-200 m-0.5"
                  style={{ 
                    borderRadius: '0.5rem',
                    backgroundColor: 'hsl(240, 10%, 7%)',
                    background: 'linear-gradient(135deg, hsl(240, 10%, 9%) 0%, hsl(240, 10%, 5%) 100%)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255, 255, 255, 0.1),
                      inset 0 -1px 0 rgba(0, 0, 0, 0.5),
                      0 2px 10px rgba(0, 0, 0, 0.4),
                      0 8px 25px rgba(0, 0, 0, 0.3)
                    `,
                    transform: 'translateZ(10px)'
                  }}
                >
                  {/* Enhanced Shiny overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/2 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-200"
                    style={{ borderRadius: '0.5rem' }}
                  ></div>
                  
                  {/* Animated light sweep */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-full group-hover:translate-x-full"
                    style={{ 
                      borderRadius: '0.5rem',
                      animation: 'sweep 0.8s ease-out'
                    }}
                  ></div>
                  
                  {/* Enhanced Icon Background with Glow */}
                  <div 
                    className="relative bg-primary/10 p-1.5 rounded-full group-hover:bg-primary/20 transition-all duration-200 group-hover:scale-110"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, hsla(253, 100%, 72%, 0.25), hsla(253, 100%, 72%, 0.1))',
                      boxShadow: `
                        inset 0 1px 0 rgba(255, 255, 255, 0.15),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.3),
                        0 0 15px hsla(253, 100%, 72%, 0.3),
                        0 2px 8px rgba(0, 0, 0, 0.2)
                      `,
                      transform: 'translateZ(5px)'
                    }}
                  >
                    {/* Icon Glow */}
                    <div className="absolute inset-0 rounded-full bg-primary/5 blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
                    <div 
                      className="h-4 w-4 text-primary relative z-10 transition-all duration-200 group-hover:text-primary group-hover:drop-shadow-sm"
                      style={{
                        filter: 'drop-shadow(0 0 4px hsla(253, 100%, 72%, 0.5))'
                      }}
                    >
                      {tool.icon}
                    </div>
                  </div>
                  
                  <h3 
                    className="text-[10px] font-semibold text-foreground whitespace-nowrap relative z-10 transition-all duration-200 group-hover:text-primary"
                    style={{
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 8px hsla(253, 100%, 72%, 0.3)'
                    }}
                    data-testid={`tool-name-${tool.id}`}
                  >
                    {tool.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
