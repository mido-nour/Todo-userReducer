import React, { useState } from "react";
import {
  StyleSheet, Text, View, TextInput, Pressable, FlatList,} from "react-native";
import TaskRow from "./components/TaskRow";
import { useTodos } from "./hooks/useTodos";

export default function App() {
  const { tasks, addTask, toggleTask, removeTask } = useTodos();
  const [input, setInput] = useState("");

  const handleAdd = () => {
    addTask(input);
    setInput("");
  };

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Simple Todo</Text>

      <View style={styles.topRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Add new a task"
        />

        <Pressable onPress={handleAdd} style={styles.saveBtn}>
          <Text style={styles.saveText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskRow
            task={item}
            onPress={() => toggleTask(item.id)}
            onLongPress={() => removeTask(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  saveBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginLeft: 10,
  },
  saveText: {
    fontSize: 18,
    color: "#1e88e5",
    fontWeight: "600",
  },
  separator: {
    height: 10,
  },
});
