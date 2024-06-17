import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

const Timer = () => {
    const [timers, setTimers] = useState([]);
    const [label, setLabel] = useState('');
    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');
    const [hours, setHours] = useState('');
    const [num, setNum] = useState(0);

    const startNewTimer = () => {
        const totalSeconds = (parseInt(seconds))+(parseInt(minutes)*60)+(parseInt(hours)*3600);
        const newTimer = {
            id: num,
            label,
            duration: totalSeconds,
            isPlaying: true
        };
        setNum(num+1);
        setTimers([...timers, newTimer]);
        setLabel('');
        setSeconds('');
        setMinutes('');
        setHours('');
    };

    const deleteTimer = (id) => {
        setTimers(timers.filter(timer => timer.id !== id));
    };

    const pauseOrPlay = (id) => {
        const newTimers = [...timers];
        for (let i=0; i<newTimers.length; i++) {
            if (newTimers[i].id == id) {
                newTimers[i].isPlaying = !newTimers[i].isPlaying;
                i = newTimers.length;
            }
        }
        setTimers(newTimers);
    };

    const createTimers = () => {
        const actualTimers = [];
        for (let i = 0; i < timers.length; i++) {
            const timer = timers[i];
            actualTimers.push(
                <View style={styles.timerContainer}>
                    <Text style={styles.label}>
                        {timer.label}
                    </Text>
                    <CountdownCircleTimer
                        isPlaying={timer.isPlaying}
                        duration={timer.duration}
                        colors={'#004777'}
                        onComplete={() => ({ shouldRepeat: false })}
                        size={100}
                    >
                        {({ remainingTime, color }) => (
                            <Text style={{ color, fontSize: 20 }}>
                                {remainingTime}
                            </Text>
                        )}
                    </CountdownCircleTimer>
                    <View style={styles.buttons}>
                        <Button title={timer.isPlaying ? "Pause" : "Play"} onPress={() => pauseOrPlay(timer.id)} />
                            <View style={{width: 10}}></View>
                        <Button title="Delete" onPress={() => deleteTimer(timer.id)} />
                    </View>
                </View>
            );
        }
        return actualTimers;
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Timer Label'
                onChangeText={text => setLabel(text)}
                value={label}
            />
            <View style={{ ...styles.container, flexDirection: 'column', marginBottom: 10 }}>
                <TextInput
                    style={styles.input}
                    placeholder='seconds'
                    keyboardType='numeric'
                    onChangeText={text => setSeconds(text)}
                    value={seconds}
                />
                <TextInput
                    style={styles.input}
                    placeholder='minutes'
                    keyboardType='numeric'
                    onChangeText={text => setMinutes(text)}
                    value={minutes}
                />
                <TextInput
                    style={styles.input}
                    placeholder='hours'
                    keyboardType='numeric'
                    onChangeText={text => setHours(text)}
                    value={hours}
                />
                <Button title="New timer" onPress={startNewTimer} />
            </View>
            <View>
                {createTimers()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        padding: 20,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
    },
    label: {
        fontSize: 20,
        color: '#004777',
    },
    timerContainer: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        margin: 10,
        flex: 1,
        alignContent: 'space-around',
    }
});

export default Timer;
