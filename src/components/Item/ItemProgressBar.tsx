import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemState } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledText from '../styledComponets/StyledText';
import StyledIcon from '../styledComponets/StyledIcon';

type Props = {
  state: ItemState;
  onChange?: (state: ItemState) => void;
  editable?: boolean;
};

const states: ItemState[] = [
  ItemState.notComplete,
  ItemState.inProsses,
  ItemState.completed,
];

const ItemProgressBar: React.FC<Props> = ({ state, onChange, editable }) => {
  const {theme} = useTheme();
  const gStyles = globalStyles(theme);

  if (!state) {
    return null;
  }

  const progressMap: Record<ItemState, number> = {
    [ItemState.notComplete]: 0.05,
    [ItemState.inProsses]: 0.5,
    [ItemState.completed]: 1,
  };

  const colorMap: Record<ItemState, string> = {
    [ItemState.notComplete]: theme.colors.line,
    [ItemState.inProsses]: '#f0ad4e',
    [ItemState.completed]: '#5cb85c',
  };

  const progress = progressMap[state];
  const color = colorMap[state];

  const handlePress = (selectedState: ItemState) => {
    if (!editable || !onChange) return;
    onChange(selectedState);
  };

  const getStepStatus = (index: number) => {
    const currentIndex = states.indexOf(state);
    if (index < currentIndex) {
      return 'completed'; // estado anterior
    } else if (index === currentIndex) {
      return 'current'; // estado actual
    } else {
      return 'upcoming'; // estado futuro
    }
  };

  const BarEditable = (
    <View style={[styles.containerEditable, {borderColor:theme.colors.line, backgroundColor:theme.colors.backgroundTop}]}>
      <StyledText style={{ color: colorMap[state], borderColor: colorMap[state], padding:5, alignSelf:'flex-start' }}>{state}</StyledText>
      <View style={styles.editable}>
        {states.map((s, index) => {
          const stepStatus = getStepStatus(index);

          const isCompleted = stepStatus === 'completed';
          const isCurrent = stepStatus === 'current';

          return (
            <React.Fragment key={s}>
              <TouchableOpacity
                style={[
                  styles.circle,
                  gStyles.shadow,
                  
                  {
                    backgroundColor: (isCompleted || isCurrent) ? color : theme.colors.backgroundTop,
                    borderColor: color,
                  },
                ]}
                onPress={() => handlePress(s)}
                activeOpacity={0.7}
              >
                <StyledText style={{ color: (isCompleted || isCurrent) ? '#fff' : color }}>
                  {isCompleted ? <StyledIcon src={require('../../assets/icons-general/checkCircle.png')} type='button' width='lg' height='lg' /> : index + 1}
                </StyledText>

              </TouchableOpacity>

              {index !== states.length - 1 && <View style={[styles.line, { backgroundColor: color }]} />}
            </React.Fragment>
          );
        })}

      </View>
    </View>


  );

  const Bar = (
    <View style={styles.container}>
      <View style={[styles.backgroundBar, { borderColor: colorMap[state] }]}>
        <View
          style={[
            styles.progressBar,
            { width: `${progress * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );

  return (
    <>
      {editable ? (
        BarEditable
      ) : (
        <View style={styles.container}>
          {Bar}
        </View>
      )}
    </>

  );
};

export default ItemProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    alignItems: 'center',
  },
  backgroundBar: {
    width: '100%',
    height: 10,
    borderRadius: 7,
    overflow: 'hidden',
    backgroundColor: '#eee'
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },

  containerEditable: {
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 10,
    width: '100%',
    alignSelf:'center',
    borderRadius:10,
    padding:5
  },
  editable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: '#ccc',
  },
});

