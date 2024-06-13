import { useEffect, useState } from 'react';

export const useIsPantallaMovil = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      // Actualizar el estado basado en el ancho de la pantalla
      setIsMobile(window.innerWidth < 768); // Puedes ajustar este valor según tus necesidades
    };

    // Verificar el tamaño de la pantalla al inicio
    handleResize();

    // Agregar un listener de redimensionamiento para actualizar el estado
    window.addEventListener('resize', handleResize);

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // No se necesita dependencia para useEffect

  return isMobile;
};
