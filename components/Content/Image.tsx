import { useEffect } from "preact/hooks";

interface ImageProps {
  src: string;
  preload?: string; // Change the type to string
  loading?: string;
  alt?: string;
  // Adicione outras propriedades conforme necessário
}

const Image = (props: ImageProps) => {
  const { preload, loading = "lazy" } = props;

  useEffect(() => {
    if (preload) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = props.src;
      document.head.appendChild(link);

      return () => {
        // Limpar o link de pré-carregamento ao desmontar o componente
        document.head.removeChild(link);
      };
    }
  }, [preload, props.src]);

  const style = {
    maxWidth: "100%",
    width: "auto",
    height: "auto",
    minHeight: "260px",
    maxHeight: "270px",
  };

  return (
    <img
      {...props}
      style={style}
      loading={"lazy"}
    />
  );
};

export default Image;
