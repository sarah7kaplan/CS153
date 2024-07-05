import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useValue } from './ValueContext';

const Timer = () => {
    const [timers, setTimers] = useState([]);
    const [label, setLabel] = useState('');
    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');
    const [hours, setHours] = useState('');
    const [num, setNum] = useState(0);
    const {currentValue, setCurrentValue} = useValue();

    useEffect(() => {
        setTimers(currentValue.timers || []);
        const maxNum = Math.max(...(currentValue.timers || []).map(item => item.id), 0);
        setNum(maxNum + 1);
    }, [currentValue]);

    const startNewTimer = () => {
        const totalSeconds = parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
        const newTimer = {
            id: num,
            label,
            duration: totalSeconds,
            isPlaying: true,
        };
        setNum(num + 1);
        const updatedTimers = [...timers, newTimer];
        setTimers(updatedTimers);
        setCurrentValue({...currentValue, timers: updatedTimers})
        setLabel('');
        setSeconds('');
        setMinutes('');
        setHours('');
    };

    const deleteTimer = (id) => {
        const updatedTimers = timers.filter((timer) => timer.id !== id);
        setTimers(updatedTimers);
        setCurrentValue({...currentValue, timers: updatedTimers});
    };

    const pauseOrPlay = (id) => {
        const newTimers = [...timers];
        const index = newTimers.findIndex((timer) => timer.id === id);
        if (index !== -1) {
            newTimers[index].isPlaying = !newTimers[index].isPlaying;
            setTimers(newTimers);
        }
    };

    const createTimers = () => {
        return timers.map((timer) => (
            <View key={timer.id} style={styles.timerContainer}>
                <Text style={styles.label}>{timer.label}</Text>
                <CountdownCircleTimer
                    isPlaying={timer.isPlaying}
                    duration={timer.duration}
                    colors={['#7F00FF', '#7F00FF', '#7F00FF']}
                    onComplete={() => [{ shouldRepeat: false, text: 'Completed' }]}
                    size={100}
                >
                    {({ remainingTime, color }) => (
                        <Text style={{ color, fontSize: 20 }}>{remainingTime}</Text>
                    )}
                </CountdownCircleTimer>
                <View style={styles.buttons}>
                    <Button
                        title={timer.isPlaying ? 'Pause' : 'Play'}
                        onPress={() => pauseOrPlay(timer.id)}
                        color="darkmagenta"
                    />
                    <View style={{ width: 10 }} />
                    <Button title="Delete" onPress={() => deleteTimer(timer.id)} color="red" />
                </View>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Timer Label"
                onChangeText={(text) => setLabel(text)}
                value={label}
            />
            <View style={styles.timeInputs}>
                <TextInput
                    style={styles.input}
                    placeholder="ss"
                    keyboardType="numeric"
                    onChangeText={(text) => setSeconds(text)}
                    value={seconds}
                />
                <TextInput
                    style={styles.input}
                    placeholder="mm"
                    keyboardType="numeric"
                    onChangeText={(text) => setMinutes(text)}
                    value={minutes}
                />
                <TextInput
                    style={styles.input}
                    placeholder="hh"
                    keyboardType="numeric"
                    onChangeText={(text) => setHours(text)}
                    value={hours}
                />
            </View>
            <Button title="New Timer" onPress={startNewTimer} color="darkmagenta" /> 
            <View style={styles.timers}>{createTimers()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#E0BBE4',
        padding: 20,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '50%',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 20,
        color: '#7F00FF',
        marginBottom: 10,
    },
    timerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    timeInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%',
        marginBottom: 10,
    },
    timers: {
        marginTop: 20,
        width: '100%',
    },
});

export default Timer;
