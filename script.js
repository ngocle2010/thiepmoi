document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // KHAI BÁO CÁC PHẦN TỬ (Elements)
    // ----------------------------------------------------------------------
    const openInviteBtn = document.getElementById('openInvite');
    const bgMusic = document.getElementById('bgMusic'); 
    const mainContent = document.getElementById('mainContent');
    const heroSection = document.querySelector('.hero');
    const musicToggleBtn = document.getElementById('musicToggle'); 

    // Pop-up QR Code
    const openQrBtn = document.getElementById('open-qr-popup');
    const closeQrBtn = document.getElementById('close-qr-popup');
    const qrModal = document.getElementById('qr-modal');

    // RSVP Form
    const rsvpForm = document.querySelector('.rsvp-form');
    // const hiddenIframe = document.getElementById('hidden_iframe'); // Không cần thiết nếu bạn dùng form action thẳng

    // Scroll Reveal & Text Highlight
    const revealElements = document.querySelectorAll('.section, .card, .album-section, .footer-block');
    const nameElements = document.querySelectorAll('.reveal-text-effect'); // Đảm bảo bạn đã thêm class này vào HTML


    // ----------------------------------------------------------------------
    // 2. HIỆU ỨNG ĐẾM NGƯỢC THỜI GIAN (Tối ưu hóa cách tính)
    // ----------------------------------------------------------------------
    const weddingDate = new Date("October 30, 2025 09:00:00").getTime();
    
    // Hàm định dạng số có 2 chữ số
    const formatNumber = (num) => String(num).padStart(2, '0');

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (distance < 0) {
            clearInterval(countdownFunction);
            if (document.getElementById("countdown")) {
                 document.getElementById("countdown").innerHTML = "ĐÃ ĐẾN NGÀY CƯỚI!";
            }
        } else {
            if (daysEl) daysEl.innerHTML = formatNumber(days);
            if (hoursEl) hoursEl.innerHTML = formatNumber(hours);
            if (minutesEl) minutesEl.innerHTML = formatNumber(minutes);
            if (secondsEl) secondsEl.innerHTML = formatNumber(seconds);
        }
    }, 1000);
    
    // ----------------------------------------------------------------------
    // 3. XỬ LÝ FORM RSVP (Xác nhận gửi thành công)
    // ----------------------------------------------------------------------
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function() {
            setTimeout(function() {
                alert('Cảm ơn bạn đã xác nhận! Dữ liệu đã được gửi thành công.');
                rsvpForm.reset(); 
            }, 500); 
        });
    }

    // ----------------------------------------------------------------------
    // 4. XỬ LÝ POP-UP QR CODE (Gửi Mừng Cưới)
    // ----------------------------------------------------------------------
    if (openQrBtn && closeQrBtn && qrModal) {
        // Mở pop-up
        openQrBtn.addEventListener('click', function() {
            qrModal.style.display = 'flex'; 
            qrModal.classList.add('fade-in');
        });

        // Đóng pop-up
        const closeModal = () => {
             qrModal.classList.remove('fade-in');
             qrModal.style.display = 'none';
        }

        closeQrBtn.addEventListener('click', closeModal);

        // Đóng khi click ra ngoài modal
        qrModal.addEventListener('click', function(event) {
            if (event.target === qrModal) {
                closeModal();
            }
        });
    }
    
    // ----------------------------------------------------------------------
    // 5. HIỆU ỨNG TRƯỢT (SCROLL-REVEAL)
    // ----------------------------------------------------------------------
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    });

    revealElements.forEach(el => {
        el.classList.add('reveal'); 
        observer.observe(el);
    });

    // ----------------------------------------------------------------------
    // 6. HIỆU ỨNG NHẤN MẠNH TÊN (TEXT HIGHLIGHT)
    // ----------------------------------------------------------------------
    const nameObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('highlighted');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.5 
    });

    nameElements.forEach(el => {
        nameObserver.observe(el);
    });

    // ----------------------------------------------------------------------
    // 7. XỬ LÝ NÚT TẮT/BẬT NHẠC (Music Toggle)
    // ----------------------------------------------------------------------
    if (musicToggleBtn && bgMusic) {
        musicToggleBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggleBtn.textContent = '🎶'; 
                musicToggleBtn.classList.add('playing');
            } else {
                bgMusic.pause();
                musicToggleBtn.textContent = '🔇'; 
                musicToggleBtn.classList.remove('playing');
            }
        });
    }

}); // <--- DẤU ĐÓNG NGOẶC NHỌN VÀ DẤU ĐÓNG NGOẶC TRÒN CUỐI CÙNG