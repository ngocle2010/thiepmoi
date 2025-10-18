document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // KHAI BÁO TẤT CẢ CÁC PHẦN TỬ (Elements) - Dùng ID bgMusicEmbed cho Iframe
    // ----------------------------------------------------------------------

    const mainContent = document.getElementById('mainContent');
    const heroSection = document.querySelector('.hero');
   

    // Pop-up QR Code
    const openQrBtn = document.getElementById('open-qr-popup');
    const closeQrBtn = document.getElementById('close-qr-popup');
    const qrModal = document.getElementById('qr-modal');

    // RSVP Form
    const rsvpForm = document.querySelector('.rsvp-form');

    // Scroll Reveal & Text Highlight
    const revealElements = document.querySelectorAll('.section, .card, .album-section, .footer-block');
    const nameElements = document.querySelectorAll('.reveal-text-effect');

    
    // 3. HIỆU ỨNG ĐẾM NGƯỢC THỜI GIAN
    // ----------------------------------------------------------------------
    const weddingDate = new Date("October 30, 2025 09:00:00").getTime();
    const formatNumber = (num) => String(num).padStart(2, '0');

    const updateCountdown = () => {
        const distance = weddingDate - new Date().getTime();
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (distance < 0) {
            clearInterval(updateCountdown); // Sửa: Dùng updateCountdown thay vì countdownFunction
            if (document.getElementById("countdown")) {
                document.getElementById("countdown").innerHTML = "ĐÃ ĐẾN NGÀY CƯỚI!";
            }
        } else {
            if (daysEl) daysEl.innerHTML = formatNumber(days);
            if (hoursEl) hoursEl.innerHTML = formatNumber(hours);
            if (minutesEl) minutesEl.innerHTML = formatNumber(minutes);
            if (secondsEl) secondsEl.innerHTML = formatNumber(seconds);
        }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);


    // ----------------------------------------------------------------------
    // 4. XỬ LÝ FORM RSVP (Gửi dữ liệu qua Fetch API)
    // ----------------------------------------------------------------------
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const form = e.target;
            const formData = new FormData(form);
            const actionUrl = form.getAttribute('action'); 
            
            fetch(actionUrl, {
                method: 'POST',
                body: formData, 
                mode: 'no-cors'
            })
            .then(() => {
                alert('Cảm ơn bạn đã xác nhận! Dữ liệu đã được gửi thành công.');
                form.reset(); 
            })
            .catch(error => {
                console.error("Lỗi khi gửi dữ liệu:", error);
                alert("Lỗi mạng: Không thể gửi dữ liệu. Vui lòng thử lại.");
            });
        });
    }

    // ----------------------------------------------------------------------
    // 5. XỬ LÝ POP-UP QR CODE (Gửi Mừng Cưới)
    // ----------------------------------------------------------------------
    if (openQrBtn && closeQrBtn && qrModal) {
        const closeModal = () => {
             qrModal.classList.remove('fade-in');
             qrModal.style.display = 'none';
        }

        openQrBtn.addEventListener('click', () => {
            qrModal.style.display = 'flex'; 
            qrModal.classList.add('fade-in');
        });

        closeQrBtn.addEventListener('click', closeModal);

        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                closeModal();
            }
        });
    }
    
    // ----------------------------------------------------------------------
    // 6. HIỆU ỨNG TRƯỢT (SCROLL-REVEAL)
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
   
});