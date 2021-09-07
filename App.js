import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { Platform, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import Task from './components/Task';

const useStyles = makeStyles((theme) => ({
  button: {
    // width: 60,
    // height: 60,
    backgroundColor: '#FFF',
    // borderRadius: 60,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: '#C0C0C0',
    // borderWidth: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* <Button color="primary">Hello World</Button> */}

      {/* Today's tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>

          <View style={styles.items}>
            {/* This is where the tasks will go */}
            {
              taskItems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

      {/* Write a task  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "web" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} onKeyPress={event => {if (event.key === 'Enter') {handleAddTask()}}} />
        <TouchableOpacity onPress={() => handleAddTask()}><Button variant="contained" color="default" className={classes.button} startIcon={<AddIcon />}  >Add</Button>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    backgroundColor: '#FFF',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});
