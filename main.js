// Language translations
const translations = {
  en: {
    "doctor-name": "Dr. Mahmoud Elbana",
    "nav-home": "Home",
    "nav-services": "Services",
    "nav-contact": "Contact",
    "doctor-title": "Medical Student & Consultant",
    "doctor-description": "Trusted Consultations at Your Convenience",
    "services-title": "Consultation Services",
    "audio-consultations": "Audio Consultations",
    "chat-consultations": "Chat Consultations",
    "vip-package": "VIP Package",
    vip: "VIP",
    "duration-30min": "30 minutes",
    "duration-1hour": "1 hour",
    "duration-2sessions": "2 Sessions one hour / each",
    "duration-4sessions": "4 Sessions one hour/each",
    "one-time-chat": "One-time chat",
    "7day-chat": "7-day chat",
    "vip-description": "Unlimited Audio & Chat",
    "vip-duration": "1 Month Access",
    "best-value": "Best Value",
    "book-now": "Book Now",
    "book-vip": "Book VIP Package",
    "whatsapp-contact": "WhatsApp: +20 123 456 7890",
  },
  ar: {
    "doctor-name": "د. محمود البنا",
    "nav-home": "الرئيسية",
    "nav-services": "الخدمات",
    "nav-contact": "التواصل",
    "doctor-title": "طالب طب واستشاري",
    "doctor-description": "استشارات موثوقة في متناول يدك",
    "services-title": "خدمات الاستشارة",
    "audio-consultations": "الاستشارات الصوتية",
    "chat-consultations": "استشارات المحادثة",
    "vip-package": "الباقة المميزة",
    vip: "مميز",
    "duration-30min": "30 دقيقة",
    "duration-1hour": "ساعة واحدة",
    "duration-2sessions": "جلستان ساعة لكل منهما",
    "duration-4sessions": "4 جلسات ساعة لكل منها",
    "one-time-chat": "محادثة واحدة",
    "7day-chat": "محادثة لمدة 7 أيام",
    "vip-description": "صوت ومحادثة غير محدود",
    "vip-duration": "وصول لمدة شهر",
    "best-value": "أفضل قيمة",
    "book-now": "احجز الآن",
    "book-vip": "احجز الباقة المميزة",
    "whatsapp-contact": "واتساب: +20 123 456 7890",
  },
}

// Language management
let currentLanguage = "en"

function initializeLanguage() {
  // Check if language preference is stored
  const savedLanguage = localStorage.getItem("preferred-language")
  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage
  }

  // Apply initial language
  applyLanguage(currentLanguage)
  updateLanguageButton()
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "en" ? "ar" : "en"
  applyLanguage(currentLanguage)
  updateLanguageButton()

  // Save preference
  localStorage.setItem("preferred-language", currentLanguage)

  // Add smooth transition effect
  document.body.style.opacity = "0.8"
  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 200)
}

function applyLanguage(language) {
  const elements = document.querySelectorAll("[data-translate]")

  elements.forEach((element) => {
    const key = element.getAttribute("data-translate")
    if (translations[language] && translations[language][key]) {
      element.textContent = translations[language][key]
    }
  })

  // Update document attributes
  document.documentElement.lang = language
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

  // Update page title and meta description
  if (language === "ar") {
    document.title = "د. محمود البنا - الاستشارات الطبية"
    document.querySelector('meta[name="description"]').content = "استشارات موثوقة في متناول يدك - د. محمود البنا"
  } else {
    document.title = "Dr. Mahmoud Elbana - Medical Consultations"
    document.querySelector('meta[name="description"]').content =
      "Trusted Medical Consultations at Your Convenience - Dr. Mahmoud Elbana"
  }
}

function updateLanguageButton() {
  const languageBtn = document.getElementById("languageToggle")
  const languageText = languageBtn.querySelector(".language-text")

  if (currentLanguage === "en") {
    languageText.textContent = "العربية"
  } else {
    languageText.textContent = "English"
  }
}

// WhatsApp booking functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize language system
  initializeLanguage()

  // Add language toggle event listener
  const languageToggle = document.getElementById("languageToggle")
  if (languageToggle) {
    languageToggle.addEventListener("click", toggleLanguage)
  }

  // WhatsApp number (replace with actual number)
  const whatsappNumber = "201013539553"

  // Get all book buttons
  const bookButtons = document.querySelectorAll(".book-btn")

  // Add click event listeners to all book buttons
  bookButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the service name from data attribute
      const serviceName = this.getAttribute("data-service")

      // Create the WhatsApp message based on current language
      let message
      if (currentLanguage === "ar") {
        message = `مرحباً د. محمود البنا، أريد حجز ${getArabicServiceName(serviceName)}.`
      } else {
        message = `Hello Dr. Mahmoud Elbana, I want to book a ${serviceName}.`
      }

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(message)

      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

      // Add loading state to button
      const originalText = this.textContent
      const loadingText = currentLanguage === "ar" ? "جاري فتح واتساب..." : "Opening WhatsApp..."
      this.textContent = loadingText
      this.disabled = true

      // Open WhatsApp
      window.open(whatsappURL, "_blank")

      // Reset button after a short delay
      setTimeout(() => {
        this.textContent = originalText
        this.disabled = false
      }, 2000)

      // Analytics tracking (optional)
      console.log(`Booking initiated for: ${serviceName} in ${currentLanguage}`)
    })
  })

  // Helper function to get Arabic service names
  function getArabicServiceName(englishService) {
    const serviceTranslations = {
      "Audio Consultation - 30 minutes": "استشارة صوتية - 30 دقيقة",
      "Audio Consultation - 1 hour": "استشارة صوتية - ساعة واحدة",
      "Audio Consultation - 3 hours": "استشارة صوتية - جلستان ساعة لكل منهما",
      "Audio Consultation - 4 hours": "استشارة صوتية - 4 جلسات ساعة لكل منها",
      "Chat Consultation - One-time": "استشارة محادثة - مرة واحدة",
      "Chat Consultation - 7 days": "استشارة محادثة - 7 أيام",
      "VIP Package - Unlimited Audio & Chat for 1 Month": "الباقة المميزة - صوت ومحادثة غير محدود لمدة شهر",
    }

    return serviceTranslations[englishService] || englishService
  }

  // Smooth scrolling for better user experience
  function smoothScroll() {
    const sections = document.querySelectorAll("section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    sections.forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(50px)"
      section.style.transition = "all 0.6s ease"
      observer.observe(section)
    })
  }

  // Initialize smooth scrolling
  smoothScroll()

  // Add hover effects for service cards
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click animation to buttons
  bookButtons.forEach((button) => {
    button.addEventListener("mousedown", function () {
      this.style.transform = "scale(0.95)"
    })

    button.addEventListener("mouseup", function () {
      this.style.transform = "scale(1)"
    })
  })

  // VIP card special effects
  const vipCard = document.querySelector(".vip-card")
  if (vipCard) {
    // Add pulsing effect to VIP badge
    const vipBadge = vipCard.querySelector(".vip-badge")
    if (vipBadge) {
      setInterval(() => {
        vipBadge.style.transform = "scale(1.1)"
        setTimeout(() => {
          vipBadge.style.transform = "scale(1)"
        }, 300)
      }, 3000)
    }
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const navHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetSection.offsetTop - navHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Add active nav link highlighting
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section, header")
    const navLinks = document.querySelectorAll(".nav-link")
    const navHeight = document.querySelector(".navbar").offsetHeight

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 50
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active")
      }
    })
  }

  // Update active nav link on scroll
  window.addEventListener("scroll", updateActiveNavLink)

  // Mobile optimization
  function optimizeForMobile() {
    if (window.innerWidth <= 768) {
      // Add mobile-specific optimizations
      const cards = document.querySelectorAll(".service-card")
      cards.forEach((card) => {
        card.style.margin = "0 0 20px 0"
      })
    }
  }

  // Call mobile optimization on load and resize
  optimizeForMobile()
  window.addEventListener("resize", optimizeForMobile)

  // Console log for debugging
  console.log("Dr. Mahmoud Elbana's website loaded successfully!")
  console.log(`Found ${bookButtons.length} booking buttons`)
  console.log(`Current language: ${currentLanguage}`)
})

// Utility function to format WhatsApp number
function formatWhatsAppNumber(number) {
  // Remove any non-digit characters
  return number.replace(/\D/g, "")
}

// Function to validate service selection
function validateServiceSelection(serviceName) {
  const validServices = [
    "Audio Consultation - 30 minutes",
    "Audio Consultation - 1 hour",
    "Audio Consultation - 3 hours",
    "Audio Consultation - 4 hours",
    "Chat Consultation - One-time",
    "Chat Consultation - 7 days",
    "VIP Package - Unlimited Audio & Chat for 1 Month",
  ]

  return validServices.includes(serviceName)
}

// Performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Error handling for WhatsApp opening
function handleWhatsAppError(error) {
  console.error("Error opening WhatsApp:", error)
  const errorMessage =
    currentLanguage === "ar"
      ? "تعذر فتح واتساب. يرجى التواصل مع د. محمود البنا مباشرة على +20 123 456 7890"
      : "Unable to open WhatsApp. Please contact Dr. Mahmoud Elbana directly at +20 123 456 7890"
  alert(errorMessage)
}

// Language detection based on browser settings
function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage
  if (browserLang.startsWith("ar")) {
    return "ar"
  }
  return "en"
}

// Initialize language based on browser preference if no saved preference
function initializeBrowserLanguage() {
  const savedLanguage = localStorage.getItem("preferred-language")
  if (!savedLanguage) {
    const detectedLanguage = detectBrowserLanguage()
    currentLanguage = detectedLanguage
    localStorage.setItem("preferred-language", currentLanguage)
  }
}
