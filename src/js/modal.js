

const removeActiveModal = () => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('modal--active');
    });
};

document.querySelectorAll("[data-modal]").forEach(function (modalButton) {

    modalButton.addEventListener("click", function(event) {
        event.preventDefault();
        removeActiveModal();
        const modalName = modalButton.getAttribute("data-modal");
        const modal = document.querySelector(`.${modalName}`);
        modal.classList.add('modal--active');
    });
});

document.querySelectorAll(".modal__close").forEach(function (closeButton) {
    closeButton.addEventListener("click", function(event) {
        event.preventDefault();
        removeActiveModal();
    });
});
