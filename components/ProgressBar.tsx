import React from "react";
import { View, Text } from "react-native";
import {
    GestureEvent,
    PanGestureHandler,
    PanGestureHandlerEventPayload,
    State,
} from "react-native-gesture-handler";

interface ProgressBarProps {
    progress: number;
    onProgressChange?: (progress: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    onProgressChange,
}) => {
    const onPanGestureEvent = (
        event: GestureEvent<PanGestureHandlerEventPayload>,
    ) => {
        const newProgress = Math.min(
            Math.max(0, event.nativeEvent.translationX),
            100,
        );
        if (onProgressChange) {
            onProgressChange(newProgress);
        }
    };

    return (
        <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                    const newProgress = Math.min(
                        Math.max(0, nativeEvent.translationX),
                        100,
                    );
                    ((newProgress: number) => {
                        if (onProgressChange) {
                            onProgressChange(newProgress);
                        }
                    })(newProgress);
                }
            }}
        >
            <View className="h-1 w-full rounded-lg overflow-hidden bg-white/10">
                <View
                    className="h-full bg-white"
                    style={{ width: `${progress}%` }}
                >
                    <Text className="p-1 text-right font-bold text-white">{`${progress}%`}</Text>
                </View>
            </View>
        </PanGestureHandler>
    );
};

export default ProgressBar;
