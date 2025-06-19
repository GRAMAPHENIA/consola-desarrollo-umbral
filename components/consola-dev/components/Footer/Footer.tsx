/**
 * Componente Footer - Muestra la barra inferior de la consola
 */
export const Footer = () => {
  return (
    <div className="p-4 bg-gray-800 text-white text-center text-sm">
      <p>Consola de Desarrollo - {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
