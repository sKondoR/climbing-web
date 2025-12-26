import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import { Toggle } from '../../../../7-shared/ui/Toggle';

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
  const [isRight, setIsRight] = useState<boolean>(false);

  const drawText = () => {
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
      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.lineWidth = 5;
      ctx.lineJoin = 'round';

      // Параметры позиционирования
      const lineHeight = 40;
      const bottomY = canvas.height - 30;
      const x = isRight ? canvas.width - 20 : 20;
      ctx.textAlign = isRight ? 'right' : 'left';

      // Формируем строки
      const routeText = `${grade} ${name}`;

      // Отрисовка текста с эффектом обводки
      const renderText = (txt: string, y: number) => {
        if (!txt.trim()) return;
        ctx.strokeText(txt, x, y);
        ctx.fillText(txt, x, y);
      };

      renderText(text, bottomY - 2 * lineHeight);
      renderText(routeText, bottomY - lineHeight);
      renderText(region, bottomY);
    };

    img.src = imgSrc; // Уже base64 — можно использовать напрямую
  };

  useEffect(() => {
    drawText(); // Перерисовываем при изменении текста или изображения
  }, [imgSrc, text, name, region, grade, isRight]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'my-route.jpg';
    link.href = canvas.toDataURL('image/jpeg', 1); // JPEG с качеством 100%
    link.click();
  };

  return (
    <>
    <div className="flex justify-center mb-3 mt-1" >
        <div className="mr-5" >
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введите текст"
                className="px-3 py-1 w-[200px] mr-5" 
            />
            <Toggle
                checked={isRight}
                onChange={(e) => {
                    console.log('>  ', e.target.value);
                    setIsRight(!isRight)
                }}
                labels={['слево', 'справо']}
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
