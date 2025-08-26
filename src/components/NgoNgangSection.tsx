'use client'

export default function NgoNgangSection() {
  const concepts = [
    {
      id: 1,
      title: "Bautroirucro",
      image: "/images/Bautroirucro/project ky yeu 199s MY0704 1 copy.jpg",
      category: "Concept Design"
    },
    {
      id: 2,
      title: "Blazer",
      image: "/images/Blazer/Artboard 10.jpg",
      category: "Brand Identity"
    },
    {
      id: 3,
      title: "Cophuc",
      image: "/images/cophuc/199s1.jpg",
      category: "Visual Design"
    },
    {
      id: 4,
      title: "Gucci",
      image: "/images/Gucci/199s_Artboard 4.jpg",
      category: "Luxury Brand"
    },
    {
      id: 5,
      title: "Kyyeumy",
      image: "/images/Kyyeumy/project ky yeu 199s MY0192 copy.jpg",
      category: "Concept Art"
    },
    {
      id: 6,
      title: "Lasvegas",
      image: "/images/Lasvegas/lasvegas12.jpg",
      category: "Event Design"
    },
    {
      id: 7,
      title: "Phaohoa",
      image: "/images/phaohoa/Final 199S-00613.JPG",
      category: "Creative Concept"
    },
    {
      id: 8,
      title: "ThanhXuanChieuTa",
      image: "/images/ThanhXuanChieuTa/Final 199S-01562.JPG",
      category: "Art Direction"
    }
  ]

  return (
    <section id="ngongang" className="ngongang-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-title">Ngó Ngàng</h2>
            <p className="section-subtitle">
              Khám phá những concept sáng tạo và độc đáo của chúng tôi
            </p>
          </div>
        </div>
        
        <div className="concept-grid">
          <div className="row">
            {concepts.map((concept) => (
              <div key={concept.id} className="col-lg-3 col-md-6 col-sm-6 mb-4">
                <div className="concept-item">
                  <div className="concept-image">
                    <img 
                      src={concept.image} 
                      alt={concept.title} 
                      className="img-fluid"
                    />
                    <div className="concept-overlay">
                      <div className="concept-info">
                        <h5>{concept.title}</h5>
                        <p>{concept.category}</p>
                        <button className="btn btn-primary btn-sm">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-5">
          <a href="/concept-hot" className="btn btn-outline-primary btn-lg">
            Xem tất cả concept
          </a>
        </div>
      </div>
    </section>
  )
}
