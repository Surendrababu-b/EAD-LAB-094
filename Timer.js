import React, { useState, useEffect } from 'react';

const Timer = ({ initialSeconds }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        // Create an interval to update the timer every second
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                // Stop the timer when it reaches zero
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(interval); // Stop the interval
                    return 0;
                }
            });
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
        </div>
    );
};

export default Timer;
