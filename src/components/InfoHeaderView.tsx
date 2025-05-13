import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Item, List } from '../types/types';
import { useTheme } from '../context/ThemeContext';
import { globalStyles } from '../styles/globalStyles';
import ItemPriority from './Item/ItemPriority';
import ChangeState from './Item/viewItem/ChangeState';
import StyledText from './styledComponets/StyledText';
import StyledIcon from './styledComponets/StyledIcon';
import ParticipantsList from './participants/ParticipantsList';
import DiagramList from './list/DiagramList'
import DatePreview from './DatePreview';

type Props = {
   data: List | Item;
};

const InfoHeaderView = ({ data }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const [openInfo, setOpenInfo] = useState(false);

   const listData = (data: List | Item): data is List => {
      return (data as List).participants !== undefined;
   };

   const isList = listData(data);

   let subCategoryColor = '';
   
   !isList && (
      subCategoryColor = data.subcategory ? theme.colors.subCategoryColors[data.subcategory] : theme.colors.textSecondary
   )

   const renderListInfo = (data: List) => (
      <View style={gStyles.rowBetween}>
         <View style={[styles.rowInfo, gStyles.gapItem]}>
            <DiagramList items={data.items} />
         </View>
         <View style={[styles.rowInfo, gStyles.gapItem]}>
            <ParticipantsList
               participants={data.participants}
               simplified
               showUserInfo={false}
               size='sm'
            />
         </View>
      </View>
   );

   const renderItemInfo = (data: Item) => (
      <View>
         <View style={[gStyles.rowBetween, { height: 30 }]}>        
            <View style={gStyles.row}>
               <StyledIcon
                  src={require('../assets/icons-general/category.png')}
                  width='sm' height='sm'
                  style={{ tintColor: subCategoryColor }}
               />
               <StyledText
                  size='sm'
                  style={{
                     color: subCategoryColor
                  }}>
                  {data.subcategory || 'Sin categoría'}
               </StyledText>
            </View>
             <ItemPriority priority={data.priority} text color='text' topPosition={-2} />
         </View>
         <ChangeState idList={data.idList} id={data.id} />
         <StyledText size='sm' style={{ marginBottom: 15 }}>Usuarios asignados:</StyledText>
         {data.assignment?.length ? (
            <ParticipantsList
               participants={data.assignment}
               simplified
               showUserInfo={false}
               size='sm'
               delimit
            />
         ) : (
            <></>
         )}
      </View>
   );

   const renderDateRow = (label: string, date: any, time: any) => (
      <View style={gStyles.rowBetween}>
         <View style={gStyles.row}>
            <StyledIcon src={require('../assets/icons-general/calendar.png')} width='sm' height='sm' />
            <StyledText size='sm'>{label}</StyledText>
         </View>
         <View style={gStyles.row}>
            <DatePreview value={date} type='startDate' showIcon={false} />
            <DatePreview value={time} type='startTime' showIcon={false} />
         </View>
      </View>
   );

   return (
      <View >
         {isList ? renderListInfo(data) : renderItemInfo(data)}

         <TouchableOpacity
            onPress={() => setOpenInfo(!openInfo)}
            style={[styles.buttonInfo, { borderBottomColor: theme.colors.line }]}>
            <StyledText size='sm' weight='medium'>Info</StyledText>
            <StyledIcon src={openInfo
               ? require('../assets/icons-general/up.png')
               : require('../assets/icons-general/down.png')} width='sm' height='sm'
            />
         </TouchableOpacity>

         <View style={[styles.infoContainer, !openInfo && { height: 0, display: 'none', gap: 2 }]}>
            {renderDateRow('Inicio', data.startDate, data.startTime)}
            {renderDateRow('Fin', data.endDate, data.endTime)}

            <View style={!data.description && gStyles.rowBetween}>
               <StyledText size='sm' weight='medium'>Descripción</StyledText>
               <StyledText size='sm'>{data.description ?? '-'}</StyledText>
            </View>

            <View style={gStyles.rowBetween}>
               <StyledText size='sm' weight='medium'>Creada por:</StyledText>
               <StyledText size='sm'>{data.createdBy.name}</StyledText>
            </View>
         </View>
      </View>
   )
}

export default InfoHeaderView

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
      borderBottomWidth: 1,
      paddingBottom: 5
   },
   buttonInfoIcon: {
      width: 24,
      height: 24,
   },
   infoContainer: {
      height: 'auto',
      paddingTop: 10,
   }
})