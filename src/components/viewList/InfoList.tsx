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
      <View style={styles.containerInfo}>
         <View style={gStyles.rowBetween}>
            <View style={[styles.rowInfo, gStyles.gapItem]}>
               <DiagramList items={list.items} />
            </View>
            <View style={[styles.rowInfo, gStyles.gapItem]}>
               <ParticipantsList
                  participants={list.participants}
                  simplified={true}
                  showUserInfo={false}
                  size='sm'
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
               <StyledText>Inicio</StyledText>
               <View style={gStyles.row}>
                  <DatePreview value={list.startDate} type='startDate' />
                  <DatePreview value={list.startTime} type='startTime' />
               </View>
            </View>
            <View style={gStyles.rowBetween}>
               <StyledText>Fin</StyledText>
               <View style={gStyles.row}>
                  <DatePreview value={list.endDate} type='endDate' />
                  <DatePreview value={list.endTime} type='endTime' />
               </View>
            </View>
            <View style={gStyles.rowBetween}>
               <StyledText>Creada por:</StyledText>
               <StyledText>{list.createdBy.name}</StyledText>
            </View>
         </View>
      </View>
   )
}

export default InfoList

const styles = StyleSheet.create({
   containerInfo:{
      position:'relative'
   },
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
      height: 'auto',
      paddingTop:10,
   }
})