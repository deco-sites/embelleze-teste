import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

function ClipBord() {
  const isCopied = useSignal(false);
  const copyUrlToClipboard = async () => {
    const urlToCopy = window.location.href;

    const textArea = document.createElement("textarea");
    textArea.value = urlToCopy;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      await navigator.clipboard.writeText(urlToCopy);
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Erro ao copiar para a área de transferência:", err);
    }

    // Remove o elemento de texto temporário

    document.body.removeChild(textArea);
  };

  return (
    <div>
      <Button
        class="btn-primary btn-outline rounded-full p-3 bg-secondary bg-opacity-10 border-none"
        onClick={copyUrlToClipboard}
      >
        <Icon
          id="Shared"
          size={25}
          class="text-secondary"
        />
      </Button>
      {isCopied.value && (
        <div className="relative ml-2">
          <div className="bg-gray-800 text-white text-sm rounded py-2 px-4 absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 opacity-100">
            URL Copiada!
          </div>
        </div>
      )}
    </div>
  );
}

export default ClipBord;
