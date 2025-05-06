import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledText from '../styledComponets/StyledText';
import { List } from '../../types/types';
import StyledIcon from '../styledComponets/StyledIcon';
import ParticipantsList from '../participants/ParticipantsList';
import DiagramList from './DiagramList';
import DatePreview from '../DatePreview';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';

type Props = {
   list: List;
};

const InfoList = ({ list }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const [openInfo, setOpenInfo] = useState(false);

   return (
      <>
         <View style={gStyles.rowBetween}>
            <View style={styles.rowInfo}>
               <DiagramList items={list.items} />
            </View>
            <View style={styles.rowInfo}>
               <StyledText size='sm'>Participantes</StyledText>
               <ParticipantsList
                  participants={list.participants}
                  simplified={true}
                  showUserInfo={false}                
               />
            </View>
         </View>
         <TouchableOpacity onPress={() => setOpenInfo(!openInfo)} style={styles.buttonInfo}>
            <StyledText>Info</StyledText>
            <StyledIcon src={openInfo ? require('../../assets/icons-general/up.png') : require('../../assets/icons-general/down.png')} width='sm' height='sm' />
         </TouchableOpacity>
         <View style={[styles.infoContainer, !openInfo && { height: 0, display: 'none' }]}>
            <View>
               <StyledText>Descripción</StyledText>
               <StyledText>{list.description ? list.description : ' -'}</StyledText>
            </View>
            <View style={gStyles.rowBetween}>
               <StyledText>Fecha de inicio</StyledText>
               <DatePreview value={list.startDate} type='startDate'  />
            </View>
            <View style={gStyles.rowBetween}>
               <StyledText>Fecha límite</StyledText>
               <DatePreview value={list.endDate} type='endDate'  />
            </View>
            <View style={gStyles.rowBetween}>
               <StyledText>Creada por: {list.createdBy.name}</StyledText>
            </View>
         </View>
      </>
   )
}

export default InfoList

const styles = StyleSheet.create({
   rowInfo: {
      width: '50%',
      alignItems: 'center',
      padding: 10,
   },
   buttonInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   buttonInfoIcon: {
      width: 24,
      height: 24,
   },
   infoContainer: {
      height: 'auto'
   }
})