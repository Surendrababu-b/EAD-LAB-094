import React, { useState, useRef, useEffect } from 'react';

const Password = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timeoutRef = useRef(null); // Ref to store timeout ID
  const countdownRef = useRef(null); // Ref to store countdown interval ID

  useEffect(() => {
    // Cleanup timer and countdown on component unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  const checkPasswordStrength = (password) => {
    let strength = 'Weak';

    if (password.length >= 8) {
      if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password)) {
        strength = 'Strong';
      } else if (/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'Moderate';
      } else {
        strength = 'Weak';
      }
    }

    return strength;
  };

  const handleChange = (event) => {
    const pwd = event.target.value;
    setPassword(pwd);
    setStrength(''); // Reset strength while typing
  };

  const startTimer = () => {
    // Clear the previous timer if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    // Set a countdown timer
    setCountdown(10); // Set countdown to 10 seconds
    setTimerStarted(true);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setStrength(checkPasswordStrength(password));
          setTimerStarted(false); // Reset the timer started state
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1-second interval

    // Set a timer to check password strength after countdown
    timeoutRef.current = setTimeout(() => {
      setStrength(checkPasswordStrength(password));
      setTimerStarted(false); // Reset the timer started state
    }, 1000 * 10); // 10 seconds delay
  };

  const handleReset = () => {
    // Clear the timer and reset the state
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    setPassword('');
    setStrength('');
    setCountdown(0);
    setTimerStarted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    startTimer();
  };

  return (
    <div>
      <h2>Password Checker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button type="submit">Check Password Strength</button>
      </form>
      <p>Password strength: <strong>{strength}</strong></p>
      {timerStarted && (
        <div>
          <p>Timer is running...</p>
          <p>Time remaining: {countdown}s</p>
        </div>
      )}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Password;
