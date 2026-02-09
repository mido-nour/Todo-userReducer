import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Task } from "../types/task";

type Props = {
  task: Task;
  onPress?: () => void;
  onLongPress?: () => void;
};

export default function TaskRow({ task, onPress, onLongPress }: Props) {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.row}>
        <Text style={[styles.text, task.done && styles.doneText]}>
          {task.title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 14,
  },
  text: {
    fontSize: 20,
  },
  doneText: {
    textDecorationLine: "line-through",
    opacity: 0.5,
    color: "red",
  },
});
