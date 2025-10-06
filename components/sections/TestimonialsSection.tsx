import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "First-time Homebuyer",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "The AI advisor found us a perfect starter home that met all our criteria and was within our budget. It even suggested neighborhoods we hadn't considered that ended up being perfect for us.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Real Estate Investor",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "As an investor, I need data-driven insights to make profitable decisions. This AI platform provides market analysis that helps me identify promising properties with strong ROI potential.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Relocating Professional",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "When I had to relocate for work, I was worried about finding a new home remotely. The AI advisor provided virtual tours and neighborhood insights that made my decision easy and confident.",
    rating: 4
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Property Developer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "The market analysis and trend predictions have been incredibly accurate, helping me make strategic decisions about where to invest in new development projects.",
    rating: 5
  },
  {
    id: 5,
    name: "Ana Martinez",
    role: "Family Home Seeker",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Finding a home for a family of five seemed impossible until we used this platform. It understood our needs perfectly and matched us with properties that had all the space and amenities we needed.",
    rating: 4
  }
];

// Duplicar los testimonios para crear un efecto de scroll infinito
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Calcular cuántos testimonios mostrar por slide según el ancho de la pantalla
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 3; // md
      return 1.2; // sm - mostrar 1.2 testimonios en móvil para indicar que hay más
    }
    return 3; // default para SSR
  };
  
  const [visibleItems, setVisibleItems] = useState(getVisibleItems());
  
  // Actualizar visibleItems en cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
      setIsMobile(window.innerWidth < 768);
    };
    
    // Establecer el estado inicial de isMobile
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animar el desplazamiento automático
  useEffect(() => {
    if (isPaused) return;

    const cardWidth = 100 / visibleItems; // Ancho de cada tarjeta en porcentaje
    const totalWidth = cardWidth * testimonials.length; // Ancho total del carrusel original

    let animationFrameId: number;
    let isResetting = false;
    
    // Velocidad de desplazamiento más lenta en móviles
    const getScrollSpeed = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return 0.008; // Más lento en móviles
      }
      return 0.01; // Velocidad normal en desktop
    };
    
    const animate = () => {
      setScrollPosition(prevPos => {
        // Si hemos desplazado más allá del ancho total, preparar para reiniciar suavemente
        if (prevPos >= totalWidth) {
          if (!isResetting) {
            isResetting = true;
            // Usar setTimeout para dar tiempo a que se complete la transición actual
            setTimeout(() => {
              setScrollPosition(0);
              isResetting = false;
            }, 0);
          }
          // Mantener la posición actual durante el reseteo para evitar saltos
          return prevPos;
        }
        return prevPos + getScrollSpeed(); // Incremento adaptativo
      });
      
      if (!isResetting) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, visibleItems]);

  // Estilo para el contenedor que se desplaza - diferentes configuraciones para móvil y desktop
  const scrollerStyle = {
    transform: `translateX(-${scrollPosition}%)`,
    width: isMobile 
      ? `${duplicatedTestimonials.length * 100}%` // Estilo móvil - más amplio para dar espacio a cada tarjeta
      : `${(duplicatedTestimonials.length / visibleItems) * 80}%`, // Estilo desktop - similar a HeroSection
  };

  // Función para calcular el ancho de cada elemento del carrusel según el dispositivo
  const getItemWidth = () => {
    if (isMobile) {
      return { width: '9%' }; // En móvil, cada tarjeta ocupa el 80% del contenedor visible
    } else {
      return { width: `${70 / visibleItems}%` }; // En desktop, se ajusta según visibleItems
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-dark-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Wrapper para el carrusel con padding específico para móvil */}
        <div className="px-2 sm:px-0">
          <div 
            className="overflow-hidden relative mx-auto max-w-[97%] sm:max-w-full rounded-lg"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
            ref={carouselRef}
          >
            {/* Efecto de desvanecimiento en el borde izquierdo */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-white dark:from-dark-bg to-transparent z-10"></div>
            
            <div 
              className="flex transition-transform duration-200 ease-linear py-4 md:py-6"
              style={scrollerStyle}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.id}-${index}`} 
                  className="flex-shrink-0 px-2 sm:px-3 md:px-4"
                  style={getItemWidth()}
                >
                  <div className="h-full">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Efecto de desvanecimiento en el borde derecho */}
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-white dark:from-dark-bg to-transparent z-10"></div>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-dark-card dark:to-dark-hover rounded-2xl p-8 md:p-12" data-aos="fade-up" data-aos-delay="1000">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0" data-aos="fade-right" data-aos-delay="1200">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('testimonials.joinThousands')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t('testimonials.joinThousandsDesc')}
              </p>
              <div className="flex space-x-4 flex-wrap">
                <div className="text-center" data-aos="fade-up" data-aos-delay="1400">
                  <p className="text-3xl font-bold text-amber-500">98%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.matchAccuracy')}</p>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="1600">
                  <p className="text-3xl font-bold text-amber-500">10k+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.happyClients')}</p>
                </div>
                <div className="text-center" data-aos="fade-up" data-aos-delay="1800">
                  <p className="text-3xl font-bold text-amber-500">$2B+</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('testimonials.propertiesSold')}</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 md:pl-12 flex justify-center" data-aos="fade-left" data-aos-delay="2000">
              <a 
                href="https://wa.me/51940125385?text=Hola,%20quiero%20saber%20más%20sobre%20DepaseoX"
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 text-white rounded-full font-medium text-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {t('testimonials.getStarted')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-4 sm:p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full transform hover:scale-105 hover:-translate-y-1">
      <div className="flex items-center mb-3 sm:mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover mr-3 sm:mr-4"
        />
        <div>
          <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{testimonial.role}</p>
        </div>
      </div>
      <div className="flex mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 sm:h-5 sm:w-5 ${
              i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 italic font-light line-clamp-8">"{testimonial.content}"</p>
    </div>
  );
};

export default TestimonialsSection;