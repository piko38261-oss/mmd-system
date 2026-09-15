// src/App.jsx
import React, { useRef, useState, useEffect } from 'react';
import './App.css';

// ข้อมูลหนัง (ไฟล์รูปในเครื่อง + หมวดหมู่ + ลิงก์ YouTube)
const movieData = [
  { 
    id: 1, title: 'Stranger Things', type: 'series',
    poster: '/Stranger Things.jpg', backdrop: '/bg-stranger.jpg',
    trailer: 'https://www.youtube.com/embed/b9EkMc79ZSU?autoplay=1&mute=1&controls=0&loop=1&playlist=b9EkMc79ZSU',
    description: 'เมื่อเด็กชายคนหนึ่งหายตัวไปอย่างลึกลับ เมืองเล็กๆ แห่งนี้ก็ต้องเผชิญกับความลับดำมืด การทดลองลับของรัฐบาล และพลังเหนือธรรมชาติที่หลบซ่อนอยู่ในเงามืด'
  },
  { 
    id: 2, title: 'The Last of Us', type: 'series',
    poster: '/The Last of Us.jpg', backdrop: '/bg-lastofus.jpg',
    trailer: 'https://www.youtube.com/embed/uLtkt8BonwM?autoplay=1&mute=1&controls=0&loop=1&playlist=uLtkt8BonwM',
    description: 'ยี่สิบปีหลังจากอารยธรรมสมัยใหม่ล่มสลาย โจเอลต้องรับภารกิจลักลอบพาเด็กสาวชื่อเอลลี่ ข้ามประเทศที่เต็มไปด้วยผู้ติดเชื้อและอันตรายเพื่อความหวังสุดท้ายของมนุษยชาติ'
  },
  { 
    id: 3, title: 'Squid Game', type: 'series',
    poster: '/Squid Game.jpg', backdrop: '/bg-squid.jpg',
    trailer: 'https://www.youtube.com/embed/oqxAJKy0ii4?autoplay=1&mute=1&controls=0&loop=1&playlist=oqxAJKy0ii4',
    description: 'ผู้คนหลายร้อยคนที่สิ้นหวังและมีหนี้สินท่วมตัวตอบรับคำเชิญปริศนาเพื่อเข้าร่วมแข่งขันในเกมเด็กเล่นที่มีเงินรางวัลมหาศาล แต่เดิมพันนั้นสูงถึงชีวิต'
  },
  { 
    id: 4, title: 'Game of Thrones', type: 'series',
    poster: '/Game of Thrones.webp', backdrop: '/bg-got.jpg',
    trailer: 'https://www.youtube.com/embed/KPLWWIOCOOQ?autoplay=1&mute=1&controls=0&loop=1&playlist=KPLWWIOCOOQ',
    description: 'มหากาพย์การต่อสู้แย่งชิงบัลลังก์เหล็กของเจ็ดตระกูลสูงศักดิ์แห่งเวสเทอรอส ท่ามกลางภัยคุกคามจากดินแดนเหมันต์ที่กำลังคืบคลานเข้ามา'
  },
  { 
    id: 5, title: 'Breaking Bad', type: 'series',
    poster: '/Breaking Bad.webp', backdrop: '/bg-breakingbad.jpg',
    trailer: 'https://www.youtube.com/embed/HhesaQXLuRY?autoplay=1&mute=1&controls=0&loop=1&playlist=HhesaQXLuRY',
    description: 'ครูสอนเคมีมัธยมปลายที่ป่วยเป็นมะเร็งระยะสุดท้าย ตัดสินใจก้าวเข้าสู่โลกของอาชญากรรมด้วยการผลิตยาเสพติด เพื่อทิ้งมรดกทางการเงินไว้ให้ครอบครัว'
  },
  { 
    id: 6, title: 'Money Heist', type: 'series',
    poster: '/Money Heist.webp', backdrop: '/bg-moneyheist.jpg',
    trailer: 'https://www.youtube.com/embed/_InqQJRqGW4?autoplay=1&mute=1&controls=0&loop=1&playlist=_InqQJRqGW4',
    description: 'อัจฉริยะลึกลับในนาม "ศาสตราจารย์" รวบรวมทีมโจรฝีมือดี เพื่อบุกยึดโรงกษาปณ์สเปนและพิมพ์เงินหลายพันล้านยูโรในปฏิบัติการปล้นที่โลกต้องจารึก'
  }
];

function App() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); 
  const row1Ref = useRef(null);

  // ระบบเปลี่ยนภาพอัตโนมัติทุก 5 วินาที
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setHeroIndex((prevIndex) => (prevIndex + 1) % movieData.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth + 100 : scrollLeft + clientWidth - 100;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const activeHero = movieData[heroIndex];

  // คัดกรองข้อมูลตามแท็บที่กด
  const displayedMovies = movieData.filter(movie => {
    if (activeTab === 'home') return true;
    return movie.type === activeTab;
  });

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      
      {/* ภาพพื้นหลังแบบเบลอ */}
      <div className="hero-bg-container" style={{ filter: 'blur(30px)', opacity: 0.35 }}>
        {movieData.map((movie, index) => (
          <img key={`blur-${movie.id}`} src={movie.backdrop} className={`hero-bg-image ${index === heroIndex ? 'active' : ''}`} alt="" />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar */}
        <header style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 40px', background: 'linear-gradient(to bottom, rgba(15,17,21,0.9) 0%, transparent 100%)',
          position: 'sticky', top: 0, zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {/* โลโก้ ปิดขีดพิมพ์ (userSelect: 'none') */}
            <h1 style={{ color: '#e50914', fontSize: '28px', fontWeight: '600', userSelect: 'none' }}>MMD STREAM</h1>
            
            <nav style={{ display: 'flex', gap: '20px', fontSize: '15px' }}>
              <span className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>หน้าแรก</span>
              <span className={`nav-link ${activeTab === 'series' ? 'active' : ''}`} onClick={() => setActiveTab('series')}>ซีรีส์</span>
              <span className={`nav-link ${activeTab === 'movies' ? 'active' : ''}`} onClick={() => setActiveTab('movies')}>ภาพยนตร์</span>
            </nav>
          </div>
          <button className="btn-login">เข้าสู่ระบบ</button>
        </header>

        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-bg-container">
             {movieData.map((movie, index) => (
              <img key={`hero-${movie.id}`} src={movie.backdrop} className={`hero-bg-image ${index === heroIndex ? 'active' : ''}`} alt={movie.title} />
            ))}
          </div>

          <div className="hero-overlay"></div>
          
          <div className="hero-content">
            <span style={{ color: '#e50914', fontWeight: 'bold', fontSize: '20px', letterSpacing: '2px', textShadow: '1px 1px 2px black' }}>
              กำลังมาแรงอันดับ {heroIndex + 1}
            </span>
            <h1 style={{ fontSize: '60px', marginBottom: '20px', marginTop: '10px', fontWeight: '700', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
              {activeHero.title}
            </h1>
            <p style={{ fontSize: '18px', color: '#fff', lineHeight: '1.6', textShadow: '1px 1px 3px rgba(0,0,0,0.8)', maxWidth: '650px', marginBottom: '35px', minHeight: '80px' }}>
              {activeHero.description}
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="btn-play" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '24px' }}>▶</span> เล่นเลย
              </button>
              <button onClick={() => setSelectedMovie(activeHero)} style={{ backgroundColor: 'rgba(109, 109, 110, 0.7)', color: 'white', border: 'none', padding: '12px 32px', fontSize: '18px', fontWeight: '600', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'background-color 0.2s' }}>
                <span style={{ fontSize: '20px' }}>ⓘ</span> ข้อมูลเพิ่มเติม
              </button>
            </div>
          </div>
        </div>
        
        {/* แถบการ์ดหนังด้านล่าง */}
        <main style={{ padding: '0 40px 40px 40px', marginTop: '-40px', position: 'relative', zIndex: 20 }}>
          <section style={{ marginBottom: '50px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '500', marginBottom: '20px', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
              {activeTab === 'home' ? 'รายการแนะนำ' : activeTab === 'series' ? 'ซีรีส์ทั้งหมด' : 'ภาพยนตร์ทั้งหมด'}
            </h2>
            <div className="carousel-wrapper">
              <button className="scroll-button scroll-left" onClick={() => scroll(row1Ref, 'left')}>{'<'}</button>
              
              <div className="scroll-container" ref={row1Ref}>
                {displayedMovies.length > 0 ? (
                  displayedMovies.map((movie) => (
                    <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)} style={{ backgroundImage: `url("${movie.poster}")`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer' }}>
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15,17,21,1) 0%, rgba(15,17,21,0) 50%)', display: 'flex', alignItems: 'flex-end', padding: '15px', borderRadius: '8px' }}>
                        <span style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>{movie.title}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#666', padding: '40px', fontSize: '18px' }}>ยังไม่มีรายการในหมวดหมู่นี้</div>
                )}
              </div>

              <button className="scroll-button scroll-right" onClick={() => scroll(row1Ref, 'right')}>{'>'}</button>
            </div>
          </section>
        </main>
      </div>

      {/* ป๊อปอัป (Modal) แสดงวิดีโอตัวอย่าง */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMovie(null)}>✕</button>
            
            <div style={{ height: '400px', width: '100%', position: 'relative', overflow: 'hidden', backgroundColor: '#000' }}>
              {selectedMovie.trailer ? (
                <iframe width="100%" height="140%" style={{ position: 'absolute', top: '-20%', left: 0, pointerEvents: 'none' }} src={selectedMovie.trailer} title="Movie Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundImage: `url("${selectedMovie.backdrop}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, #141414 0%, transparent 100%)', pointerEvents: 'none' }}></div>
              <div style={{ position: 'absolute', bottom: '40px', left: '40px', pointerEvents: 'none' }}>
                <h2 style={{ fontSize: '40px', marginBottom: '15px', textShadow: '2px 2px 4px black' }}>{selectedMovie.title}</h2>
                <button className="btn-play" style={{ padding: '8px 24px', fontSize: '16px', pointerEvents: 'auto' }}>▶ เล่นเลย</button>
              </div>
            </div>

            <div className="episode-list">
              <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#d2d2d2', marginBottom: '30px', marginTop: '20px' }}>{selectedMovie.description}</p>
              <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#fff' }}>ตอนทั้งหมด</h3>
              {[1, 2, 3].map((ep) => (
                <div key={ep} className="episode-item">
                  <h4 style={{ fontSize: '24px', color: '#aaa', width: '40px' }}>{ep}</h4>
                  <div style={{ width: '130px', height: '70px', backgroundColor: '#333', borderRadius: '4px', backgroundImage: `url("${selectedMovie.backdrop}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: '16px', marginBottom: '5px' }}>ตอนที่ {ep}</h5>
                    <p style={{ fontSize: '13px', color: '#888' }}>45 นาที</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;