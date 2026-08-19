document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.querySelector('.play-button-container');
    const modal = document.getElementById('videoModal');
    const closeModal = document.getElementById('closeModal');
    const modalVideo = document.getElementById('modalVideo');
    const overlay = document.querySelector('.modal-overlay');

    // Открыть модалку
    playBtn.addEventListener('click', () => {   
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запрещаем скролл сайта
        modalVideo.play(); // Запускаем видео в модалке
    });

    // Функция закрытия
    function handleClose() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем скролл
        modalVideo.pause(); // Ставим на паузу
        modalVideo.currentTime = 0; // Сбрасываем время
    }

    // Закрыть по кнопке
    closeModal.addEventListener('click', handleClose);

    // Закрыть по клику на темный фон
    overlay.addEventListener('click', handleClose);

    // Закрыть по клавише Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            handleClose();
        }
    });
});

// Находит все поля ввода телефона и применяет маску ко всем
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', onPhoneInput);
    input.addEventListener('keydown', onPhoneKeyDown);
});