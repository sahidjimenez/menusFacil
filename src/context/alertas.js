import Swal from 'sweetalert2';

export const alertaAceptado = () => {
  Swal.fire({
    text: 'Agregado al carrito',
    icon: 'success',
    timer: 1500,
    width: '150px',
  });
};