import React, { useState } from 'react';
import './GiftCover.css';

function GiftCover({ onOpenGift }) {
    // Controla si empiezan las animaciones de cinta/tapa
    const [isOpening, setIsOpening] = useState(false);
    // Controla el fade out final de toda la portada
    const [fadeOut, setFadeOut] = useState(false);

    const handleOpenGift = () => {
        // 1. Disparamos las animaciones de cintas y tapa
        setIsOpening(true);

        // 2. Esperamos 2s (cuando cintas y tapa acaben o casi),
        //    y entonces activamos el fade out.
        setTimeout(() => {
            setFadeOut(true);
        }, 1000);

        // 3. Esperamos 3s en total para desmontar el componente.
        //    Así el fade out (1s) termina sin cortes.
        setTimeout(() => {
            onOpenGift();
        }, 2000);
    };

    return (
        <div className={`gift-cover ${fadeOut ? 'gift-cover--fadeout' : ''}`}>
            <div className="gift-instructions">
                <h1 className="gift-title">¡Tienes un regalo especial!</h1>
                <p className="gift-subtitle">Pulsa el botón para abrir tu sorpresa</p>
                <button className="gift-button" onClick={handleOpenGift}>
                    Abrir regalo
                </button>
            </div>

            <div className="gift-3d-scene">
                {/* Activamos cintas/tapa con la clase .gift-box--opening */}
                <div className={`gift-box ${isOpening ? 'gift-box--opening' : ''}`}>
                    {/* Cintas */}
                    <div className="gift-ribbon-vertical"></div>
                    <div className="gift-ribbon-horizontal"></div>

                    {/* Base de la caja (80% de la altura) */}
                    <div className="gift-box-base"></div>

                    {/* Tapa de la caja (20% de la altura) */}
                    <div className="gift-box-lid"></div>
                </div>
            </div>
        </div>
    );
}

export default GiftCover;
