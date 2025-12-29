import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export type AddTextToImgProps = {
    imgSrc: string,
    name: string,
    region: string,
    grade: string,
};

const AddTextToImg = ({
    imgSrc = '', // ожидается в формате data:image/png;base64,...
    name = '',
    region = '',
    grade = '',
}: AddTextToImgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(30);
  const [p, setTextPosition] = useState({
    isTop: false,
    isRight: false,
  });

  useEffect(() => {
    if (!imgSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      // Устанавливаем размеры canvas под изображение
      canvas.width = img.width;
      canvas.height = img.height;

      // Очищаем и рисуем фон
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Настройки стиля текста
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.fillStyle = textColor;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 7;
      ctx.lineJoin = 'round';

      // Параметры позиционирования
      const lineHeight = fontSize + 10;
      const startY = p.isTop ? (lineHeight + (text ? 2 : 1) * lineHeight) : canvas.height - lineHeight + 10;
      const startX = p.isRight ? canvas.width - 30 : 30;
      ctx.textAlign = p.isRight ? 'right' : 'left';

      // Формируем строки
      const routeText = `${grade} ${name}`;

      // Отрисовка текста с эффектом обводки
      const renderText = (txt: string, y: number) => {
        if (!txt.trim()) return;
        ctx.strokeText(txt, startX, y);
        ctx.fillText(txt, startX, y);
      };

      renderText(text, startY - 2 * lineHeight);
      renderText(routeText, startY - lineHeight);
      renderText(region, startY);
    };

    img.src = imgSrc; // Уже base64 — можно использовать напрямую
  }, [imgSrc, text, name, region, grade, p.isRight, p.isTop, textColor, fontSize]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'my-route.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1); // JPEG с качеством 100%
    link.click();
  };

  const onTextPositionClick = (top: boolean, right: boolean) => () => {
    setTextPosition({ isTop: top, isRight: right });
  }

  return (
    <>
    <div className="flex justify-center mb-3 mt-1 items-center" >
        <div className="mr-5" >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст"
                className="px-3 py-1 w-[200px]" 
            />
        </div>
        <div className="flex flex-wrap w-8 h-8 border border-blue-300 overflow-hidden transition-shadow mr-5">
          <div className={`w-1/2 h-1/2 ${p.isTop && !p.isRight ? 'bg-blue-500' : 'cursor-pointer hover:bg-blue-300'}`}
            onClick={onTextPositionClick(true, false)}
          ></div>
          <div className={`w-1/2 h-1/2 ${p.isTop && p.isRight ? 'bg-blue-500' : 'cursor-pointer hover:bg-blue-300'}`}
            onClick={onTextPositionClick(true, true)}
          ></div>
          <div className={`w-1/2 h-1/2 ${!p.isTop && !p.isRight ? 'bg-blue-500' : 'cursor-pointer hover:bg-blue-300'}`}
            onClick={onTextPositionClick(false, false)}
          ></div>
          <div className={`w-1/2 h-1/2 ${!p.isTop && p.isRight ? 'bg-blue-500' : 'cursor-pointer hover:bg-blue-300'}`}
            onClick={onTextPositionClick(false, true)}
          ></div>
        </div>
        <div className="mr-5">
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            {[20, 30, 40, 50, 60].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>
        <div className="mr-5">
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
            title="Выберите цвет текста"
          />
        </div>
        <FontAwesomeIcon
            icon={faDownload}
            className="text-2xl cursor-pointer text-blue-500 hover:text-orange-500 mt-1 h-5 w-5" 
            onClick={downloadImage}
            aria-label={`скачать изображение`}
        />
      </div>
      <div className="flex justify-center">
        <canvas
            ref={canvasRef}
            style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </>
  );
};

export default AddTextToImg;
