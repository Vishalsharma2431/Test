import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');
const GRID_SIZE = width / 2; // 2x2 grid
const TOTAL_WIDGETS = 4;

const DraggableComponents = (): JSX.Element => {
  const [widgets, setWidgets] = useState<
    {
      id: string;
      x: number;
      y: number;
      color: string;
      country: string;
      showDropdown: boolean;
    }[]
  >([
    {
      id: '1',
      x: 0,
      y: 0,
      color: '#FF6F61',
      country: 'USA',
      showDropdown: false,
    },
    {
      id: '2',
      x: 1,
      y: 0,
      color: '#6FA3EF',
      country: 'India',
      showDropdown: false,
    },
    {
      id: '3',
      x: 0,
      y: 1,
      color: '#FFD54F',
      country: 'Canada',
      showDropdown: false,
    },
    {
      id: '4',
      x: 1,
      y: 1,
      color: '#8BC34A',
      country: 'Australia',
      showDropdown: false,
    },
  ]);

  const positions = useRef<Array<Animated.ValueXY>>(
    widgets.map(
      widget =>
        new Animated.ValueXY({
          x: widget.x * GRID_SIZE,
          y: widget.y * GRID_SIZE,
        }),
    ),
  ).current;

  const swapWidgets = (
    draggedWidgetId: string,
    targetX: number,
    targetY: number,
  ): void => {
    setWidgets(prevWidgets => {
      const draggedIndex = prevWidgets.findIndex(
        widget => widget.id === draggedWidgetId,
      );
      const targetIndex = prevWidgets.findIndex(
        widget => widget.x === targetX && widget.y === targetY,
      );

      if (targetIndex !== -1) {
        const draggedWidget = prevWidgets[draggedIndex];
        const targetWidget = prevWidgets[targetIndex];

        prevWidgets[draggedIndex] = {
          ...draggedWidget,
          x: targetWidget.x,
          y: targetWidget.y,
        };
        prevWidgets[targetIndex] = {
          ...targetWidget,
          x: draggedWidget.x,
          y: draggedWidget.y,
        };
      } else {
        prevWidgets[draggedIndex] = {
          ...prevWidgets[draggedIndex],
          x: targetX,
          y: targetY,
        };
      }

      return [...prevWidgets];
    });
  };

  const toggleDropdown = (index: number): void => {
    setWidgets(prevWidgets =>
      prevWidgets.map((widget, i) =>
        i === index ? {...widget, showDropdown: !widget.showDropdown} : widget,
      ),
    );
  };

  const selectCountry = (index: number, country: string): void => {
    setWidgets(prevWidgets =>
      prevWidgets.map((widget, i) =>
        i === index ? {...widget, country, showDropdown: false} : widget,
      ),
    );
  };

  const panResponders = useRef<Array<PanResponder.PanResponderInstance>>(
    positions.map((position, index) =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          position.setOffset({
            x: position.x._value,
            y: position.y._value,
          });
          position.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event(
          [null, {dx: position.x, dy: position.y}],
          {useNativeDriver: false},
        ),
        onPanResponderRelease: (e, gestureState) => {
          position.flattenOffset();

          const draggedWidget = widgets[index];
          const newX = Math.round(position.x._value / GRID_SIZE);
          const newY = Math.round(position.y._value / GRID_SIZE);

          if (newX < 0 || newY < 0 || newX >= 2 || newY >= 2) {
            Animated.spring(position, {
              toValue: {
                x: draggedWidget.x * GRID_SIZE,
                y: draggedWidget.y * GRID_SIZE,
              },
              useNativeDriver: false,
            }).start();
            return;
          }

          swapWidgets(draggedWidget.id, newX, newY);

          Animated.spring(position, {
            toValue: {x: newX * GRID_SIZE, y: newY * GRID_SIZE},
            useNativeDriver: false,
          }).start();
        },
      }),
    ),
  ).current;

  React.useEffect(() => {
    widgets.forEach((widget, index) => {
      Animated.spring(positions[index], {
        toValue: {
          x: widget.x * GRID_SIZE,
          y: widget.y * GRID_SIZE,
        },
        useNativeDriver: false,
      }).start();
    });
  }, [widgets]);

  return (
    <View style={styles.container}>
      {widgets.map((widget, index) => (
        <Animated.View
          key={widget.id}
          {...panResponders[index].panHandlers}
          style={[
            styles.widget,
            {
              backgroundColor: widget.color,
              transform: positions[index].getTranslateTransform(),
            },
          ]}>
          <Text style={styles.widgetText}>{`Widget ${widget.id}`}</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => toggleDropdown(index)}>
            <Text style={styles.dropdownText}>{widget.country}</Text>
          </TouchableOpacity>
          {widget.showDropdown && (
            <View style={styles.dropdown}>
              {['USA', 'India', 'Canada', 'Australia'].map(country => (
                <TouchableOpacity
                  key={country}
                  style={styles.dropdownItem}
                  onPress={() => selectCountry(index, country)}>
                  <Text style={styles.dropdownItemText}>{country}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
  widget: {
    position: 'absolute',
    width: GRID_SIZE,
    height: GRID_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
  },
  widgetText: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
  },
  dragButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  dragText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  dropdownButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: '80%',
    height: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    bottom: 50,
    left: 10,
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    zIndex: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
});

export default DraggableComponents;
