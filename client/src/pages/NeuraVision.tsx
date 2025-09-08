import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Share, Copy, RefreshCw, Sparkles, Zap, Wifi, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const artStyles = [
  {
    category: "Core Styles",
    styles: ["Photorealistic", "Digital Art", "Concept Art", "Anime", "Cartoon", "3D Render", "Oil Painting", "Watercolor", "Sketch", "Line Art"]
  },
  {
    category: "Art Movements", 
    styles: ["Impressionism", "Surrealism", "Cubism", "Abstract Expressionism", "Pop Art", "Minimalism", "Art Nouveau", "Baroque", "Renaissance", "Gothic"]
  },
  {
    category: "Mediums & Techniques",
    styles: ["Acrylic Paint", "Charcoal", "Pencil Drawing", "Ink Wash", "Pastels", "Gouache", "Tempera", "Fresco", "Collage", "Mixed Media"]
  },
  {
    category: "Subjects & Genres",
    styles: ["Portrait", "Landscape", "Still Life", "Abstract", "Fantasy", "Sci-Fi", "Horror", "Steampunk", "Cyberpunk", "Post-Apocalyptic"]
  },
  {
    category: "Illustration & Design",
    styles: ["Vector Art", "Logo Design", "Icon Design", "Character Design", "Environment Design", "UI/UX Design", "Infographic", "Comic Book", "Manga", "Children's Book"]
  },
  {
    category: "Creative Blends",
    styles: ["Retro-Futuristic", "Vintage", "Modern", "Contemporary", "Classical", "Neo-Classical", "Art Deco", "Bauhaus", "Memphis Style", "Vaporwave"]
  },
  {
    category: "Experimental & Modern",
    styles: ["Glitch Art", "Pixel Art", "Low Poly", "Isometric", "Geometric", "Procedural", "Generative", "Algorithmic", "Neural Style", "Deep Dream"]
  },
  {
    category: "Fantasy & Storytelling",
    styles: ["Epic Fantasy", "Dark Fantasy", "Urban Fantasy", "Fairy Tale", "Mythology", "Legend", "Folklore", "Medieval", "Viking", "Celtic"]
  },
  {
    category: "Sci-Fi & Cyberpunk Worlds",
    styles: ["Space Opera", "Hard Sci-Fi", "Biopunk", "Dieselpunk", "Atompunk", "Solarpunk", "Cyberpunk Noir", "Alien Worlds", "Future Cities", "Mech Design"]
  },
  {
    category: "Luminous & Glowing Effects",
    styles: ["Neon", "Holographic", "Bioluminescent", "Aurora", "Plasma", "Electric", "Laser", "LED", "Phosphorescent", "Radiant"]
  },
  {
    category: "Fantasy & Surreal Landscapes",
    styles: ["Floating Islands", "Crystal Caves", "Enchanted Forest", "Desert Oasis", "Underwater City", "Sky Castle", "Volcanic Realm", "Ice Kingdom", "Mystical Valley", "Alien Planet"]
  },
  {
    category: "Material & Texture Fusions",
    styles: ["Chrome", "Gold Leaf", "Marble", "Wood Grain", "Fabric Texture", "Metal Mesh", "Glass", "Crystal", "Stone Carving", "Clay Sculpture"]
  },
  {
    category: "Nature & Biomechanical Hybrids",
    styles: ["Organic Tech", "Bio-Architecture", "Living Machines", "Coral Tech", "Tree Circuits", "Flower Robotics", "Insect Mech", "Ocean Tech", "Mountain Fortress", "Sky Gardens"]
  },
  {
    category: "Cosmic & Celestial Art",
    styles: ["Galaxy", "Nebula", "Star Field", "Black Hole", "Solar System", "Cosmic Storm", "Space Debris", "Asteroid Belt", "Comet Trail", "Planetary Rings"]
  },
  {
    category: "Miscellaneous & Themed Aesthetics",
    styles: ["Film Noir", "Western", "Tropical", "Arctic", "Desert", "Urban", "Rural", "Industrial", "Organic", "Minimalist Luxury"]
  }
];

const imageRatios = [
  { label: "Square (1:1)", value: "1:1", width: 1024, height: 1024 },
  { label: "Landscape (16:9)", value: "16:9", width: 1920, height: 1080 },
  { label: "Portrait (9:16)", value: "9:16", width: 1080, height: 1920 },
  { label: "Standard (4:3)", value: "4:3", width: 1024, height: 768 }
];

const models = [
  { label: "Flux Dev", value: "flux" },
  { label: "Flux Safe", value: "flux-safe" },
  { label: "Turbo Uncensored", value: "turbo" }
];

const randomPrompts = [
  "A majestic dragon soaring through aurora-filled skies above crystalline mountains",
  "Cyberpunk cityscape with neon-lit skyscrapers and flying vehicles in the rain",
  "Ancient library with floating books and magical glowing orbs",
  "Underwater palace with coral gardens and bioluminescent sea creatures",
  "Steampunk workshop filled with intricate clockwork mechanisms and brass pipes",
  "Floating islands connected by rainbow bridges in a pastel sky",
  "Futuristic space station orbiting a ringed planet with multiple moons",
  "Enchanted forest with glowing mushrooms and fairy lights at twilight"
];

export default function NeuraVision() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedRatio, setSelectedRatio] = useState(imageRatios[0]);
  const [customWidth, setCustomWidth] = useState(1024);
  const [customHeight, setCustomHeight] = useState(1024);
  const [referenceStrength, setReferenceStrength] = useState([50]);
  const [selectedModel, setSelectedModel] = useState(models[0].value);
  const [seed, setSeed] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [networkSpeed, setNetworkSpeed] = useState('Good');
  const [apiStatus, setApiStatus] = useState('online');
  const [cooldownTime, setCooldownTime] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  // Network speed detection simulation
  useEffect(() => {
    const checkNetworkSpeed = () => {
      const connection = (navigator as any).connection;
      if (connection) {
        const speed = connection.downlink;
        if (speed > 10) setNetworkSpeed('Excellent');
        else if (speed > 5) setNetworkSpeed('Good');
        else if (speed > 1) setNetworkSpeed('Fair');
        else setNetworkSpeed('Slow');
      }
    };
    
    checkNetworkSpeed();
    const interval = setInterval(checkNetworkSpeed, 10000);
    return () => clearInterval(interval);
  }, []);

  // Cooldown timer
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const generateRandomPrompt = () => {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setPrompt(randomPrompt);
  };

  const enhancePrompt = () => {
    if (!prompt.trim()) {
      toast({
        title: "No prompt to enhance",
        description: "Please enter a prompt first.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate prompt enhancement
    const enhancements = [
      ", highly detailed, 8k resolution, masterpiece",
      ", cinematic lighting, dramatic composition, award-winning",
      ", hyperrealistic, stunning visual effects, professional quality",
      ", vibrant colors, dynamic lighting, exceptional detail"
    ];
    
    const enhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
    setPrompt(prev => prev + enhancement);
    
    toast({
      title: "Prompt Enhanced!",
      description: "Your prompt has been enhanced with professional modifiers."
    });
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Missing Prompt",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive"
      });
      return;
    }

    if (cooldownTime > 0) {
      toast({
        title: "Cooldown Active",
        description: `Please wait ${cooldownTime} seconds before generating another image.`,
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setLoadingMessage('Initializing AI model...');
    
    try {
      // Simulate loading phases
      const loadingPhases = [
        'Analyzing prompt...',
        'Generating composition...',
        'Rendering details...',
        'Applying style...',
        'Finalizing image...'
      ];
      
      for (let i = 0; i < loadingPhases.length; i++) {
        setLoadingMessage(loadingPhases[i]);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Build the enhanced prompt
      let enhancedPrompt = prompt;
      if (selectedStyle) {
        enhancedPrompt += `, ${selectedStyle} style`;
      }
      if (negativePrompt) {
        enhancedPrompt += `, avoid: ${negativePrompt}`;
      }

      // Generate image URL using Pollinations AI
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=${customWidth}&height=${customHeight}&seed=${seed || Math.floor(Math.random() * 10000)}&model=${selectedModel}`;
      
      setGeneratedImage(imageUrl);
      setCooldownTime(10); // 10 second cooldown
      
      toast({
        title: "Image Generated!",
        description: "Your AI-generated image is ready."
      });
      
    } catch (error) {
      console.error('Generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setLoadingMessage('');
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard."
    });
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `neuravision-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Your image is being downloaded."
    });
  };

  const shareImage = () => {
    if (!generatedImage) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'NeuraVision AI Generated Image',
        text: `Check out this AI-generated image: ${prompt}`,
        url: generatedImage
      });
    } else {
      navigator.clipboard.writeText(generatedImage);
      toast({
        title: "Link Copied",
        description: "Image URL copied to clipboard."
      });
    }
  };

  const resetForm = () => {
    setPrompt('');
    setNegativePrompt('');
    setSelectedStyle('');
    setSeed('');
    setReferenceStrength([50]);
    setGeneratedImage('');
    
    toast({
      title: "Form Reset",
      description: "All fields have been cleared."
    });
  };

  const handleRatioChange = (ratio: string) => {
    const selected = imageRatios.find(r => r.value === ratio);
    if (selected) {
      setSelectedRatio(selected);
      setCustomWidth(selected.width);
      setCustomHeight(selected.height);
    }
  };

  return (
    <div className="min-h-screen bg-[#05060a] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-transparent to-transparent opacity-50"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-purple-500/20 bg-[#0a0a24]/80 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NeuraVision AI
                </h1>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300">Network: {networkSpeed}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Circle className={`w-3 h-3 ${apiStatus === 'online' ? 'text-green-400' : 'text-red-400'} fill-current`} />
                  <span className="text-sm text-purple-300">API Status</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Panel - Settings */}
            <Card className="bg-[#0a0a24]/60 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span>Generation Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-300">Prompt</label>
                  <div className="relative">
                    <Textarea
                      data-testid="input-prompt"
                      placeholder="Describe the image you want to generate..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[120px] bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50 resize-none"
                    />
                    <div className="absolute bottom-3 right-3 flex space-x-2">
                      <Button
                        data-testid="button-copy-prompt"
                        size="sm"
                        variant="ghost"
                        onClick={copyPrompt}
                        className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        data-testid="button-random-prompt"
                        size="sm"
                        variant="ghost"
                        onClick={generateRandomPrompt}
                        className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button
                        data-testid="button-enhance-prompt"
                        size="sm"
                        variant="ghost"
                        onClick={enhancePrompt}
                        className="h-8 w-8 p-0 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
                      >
                        <Sparkles className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Negative Prompt */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-300">Negative Prompt</label>
                  <Input
                    data-testid="input-negative-prompt"
                    placeholder="What to avoid in the image..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    className="bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50"
                  />
                </div>

                {/* Art Style */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-300">Art Style</label>
                  <Select data-testid="select-art-style" value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white">
                      <SelectValue placeholder="Choose an art style..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a24] border-purple-500/30 text-white max-h-80">
                      {artStyles.map((category) => (
                        <div key={category.category}>
                          <div className="px-2 py-1 text-xs font-semibold text-purple-400 uppercase tracking-wider bg-purple-500/10">
                            {category.category}
                          </div>
                          {category.styles.map((style) => (
                            <SelectItem key={style} value={style} className="focus:bg-purple-500/20 focus:text-white">
                              {style}
                            </SelectItem>
                          ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Ratio */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-300">Image Ratio</label>
                  <Select data-testid="select-image-ratio" value={selectedRatio.value} onValueChange={handleRatioChange}>
                    <SelectTrigger className="bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a24] border-purple-500/30 text-white">
                      {imageRatios.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value} className="focus:bg-purple-500/20 focus:text-white">
                          {ratio.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-purple-400">Width</label>
                      <Input
                        data-testid="input-width"
                        type="number"
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Number(e.target.value))}
                        className="bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-purple-400">Height</label>
                      <Input
                        data-testid="input-height"
                        type="number"
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Number(e.target.value))}
                        className="bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Reference Strength */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-purple-300">Reference Strength</label>
                    <span className="text-sm text-purple-400">{referenceStrength[0]}%</span>
                  </div>
                  <Slider
                    data-testid="slider-reference-strength"
                    value={referenceStrength}
                    onValueChange={setReferenceStrength}
                    max={100}
                    step={1}
                    className="[&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-400"
                  />
                </div>

                {/* Model Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-300">Model</label>
                  <Select data-testid="select-model" value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0a0a24] border-purple-500/30 text-white">
                      {models.map((model) => (
                        <SelectItem key={model.value} value={model.value} className="focus:bg-purple-500/20 focus:text-white">
                          {model.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Seed */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-purple-300">Seed (Optional)</label>
                  <Input
                    data-testid="input-seed"
                    placeholder="Random seed number..."
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    className="bg-[#05060a]/80 border-purple-500/30 focus:border-purple-400 text-white placeholder-purple-300/50"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <Button
                    data-testid="button-generate"
                    onClick={generateImage}
                    disabled={isGenerating || cooldownTime > 0}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {isGenerating ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </div>
                    ) : cooldownTime > 0 ? (
                      <span>Cooldown ({cooldownTime}s)</span>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Generate</span>
                      </div>
                    )}
                    {!isGenerating && cooldownTime === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
                    )}
                  </Button>
                  
                  <Button
                    data-testid="button-reset"
                    onClick={resetForm}
                    variant="outline"
                    className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/50"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Panel - Image Preview */}
            <Card className="bg-[#0a0a24]/60 backdrop-blur-md border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Image Preview</span>
                  {generatedImage && (
                    <div className="flex space-x-2">
                      <Button
                        data-testid="button-download"
                        size="sm"
                        onClick={downloadImage}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        data-testid="button-share"
                        size="sm"
                        variant="outline"
                        onClick={shareImage}
                        className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
                      >
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square bg-[#05060a]/60 rounded-lg border-2 border-dashed border-purple-500/30 overflow-hidden group">
                  {isGenerating && (
                    <div className="absolute inset-0 bg-[#0a0a24]/90 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                      <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4"></div>
                      <p className="text-purple-300 text-center px-4">{loadingMessage}</p>
                      <div className="w-64 h-2 bg-purple-500/20 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )}
                  
                  {generatedImage ? (
                    <img
                      ref={imageRef}
                      src={generatedImage}
                      alt="Generated image"
                      data-testid="img-generated"
                      className="w-full h-full object-contain rounded-lg transition-opacity duration-500"
                      onLoad={() => {
                        toast({
                          title: "Image Loaded",
                          description: "Your generated image is now ready."
                        });
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-400/60">
                      <Sparkles className="w-16 h-16 mb-4" />
                      <p className="text-lg font-medium">Your masterpiece awaits</p>
                      <p className="text-sm opacity-60 mt-2">Enter a prompt and click generate</p>
                    </div>
                  )}
                  
                  {generatedImage && !isGenerating && (
                    <Button
                      data-testid="button-refresh-stuck"
                      size="sm"
                      variant="ghost"
                      className="absolute bottom-4 right-4 bg-[#0a0a24]/80 hover:bg-purple-500/20 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={generateImage}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Regenerate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-purple-500/20 bg-[#0a0a24]/80 backdrop-blur-md mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-purple-300/60 text-sm mb-4 md:mb-0">
                © 2024 NeuraVision AI. Powered by advanced neural networks.
              </div>
              
              <div className="flex space-x-6">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  data-testid="link-twitter"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  data-testid="link-instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.137 0-3.864-1.729-3.864-3.866s1.727-3.864 3.864-3.864c2.136 0 3.864 1.727 3.864 3.864s-1.728 3.866-3.864 3.866zm7.119 0c-2.137 0-3.864-1.729-3.864-3.866s1.727-3.864 3.864-3.864c2.137 0 3.864 1.727 3.864 3.864s-1.727 3.866-3.864 3.866z"/>
                  </svg>
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  data-testid="link-discord"
                >
                  <span className="sr-only">Discord</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
                  </svg>
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  data-testid="link-telegram"
                >
                  <span className="sr-only">Telegram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}