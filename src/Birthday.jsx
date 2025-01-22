import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';

const Birthday = ({ name, day, month }) => {
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  if (name === undefined || day === undefined || month === undefined) {
    // Valores por defecto
    name = 'L’Entrecote Café de París';
    month = 1;
    day = 31;
  }

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  // Check si hoy es el día de la reserva
  const isItBday =
    currentTime.getDate() === day && currentTime.getMonth() === month - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      const countdown = () => {
        const dateAtm = new Date();
        let birthdayDay = new Date(currentYear, month - 1, day);

        if (dateAtm > birthdayDay) {
          // Si la fecha ya pasó, se toma el próximo año
          birthdayDay = new Date(currentYear + 1, month - 1, day);
        } else if (dateAtm.getFullYear() === birthdayDay.getFullYear() + 1) {
          birthdayDay = new Date(currentYear, month - 1, day);
        }

        const currentTime = dateAtm.getTime();
        const birthdayTime = birthdayDay.getTime();
        const timeRemaining = birthdayTime - currentTime;

        let seconds = Math.floor(timeRemaining / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        setState((prevState) => ({
          ...prevState,
          seconds,
          minutes,
          hours,
          days,
          isItBday,
        }));
      };

      if (!isItBday) {
        countdown();
      } else {
        setState((prevState) => ({
          ...prevState,
          isItBday: true,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentYear, day, isItBday, month]);

  return (
    <div className="page">
      {/* 1. LOGO ARRIBA */}
      <img
        src="/logo_cafe.png"
        alt="Logo Café de París"
        className="restaurant-image"
        style={{ maxWidth: '250px', marginBottom: '20px' }}
      />

      {/* 2. CONTADOR */}
      <Countdown countdownData={state} name={name} />

      {/* 3. MOSTRAR RESERVA + MAPA SI NO ES EL DÍA */}
      {!state.isItBday && (
        <>
          <div className="birthdate">Reserva: 31 Enero 2025 [22:30]</div>
          {/* 4. MAPA AL FINAL */}
          <div className="map-container">
            <iframe
              title="Ubicación de L’Entrecote Café de París"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.4457773691786!2d-3.6888824846051567!3d40.421840879363215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422899972b9187%3A0xf545f8ffd6dc345e!2sL%E2%80%99Entrecote%20Caf%C3%A9%20de%20Par%C3%ADs!5e0!3m2!1ses!2ses!4v1679860244056!5m2!1ses!2ses"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </>
      )}

      {/* 5. MENSAJE SI YA ES EL DÍA */}
      {state.isItBday && (
        <div className="wish-message">¡Hoy es el gran día! ¡A disfrutar!</div>
      )}
    </div>
  );
};

export default Birthday;
