import React from 'react';
import {WebView} from 'react-native-webview';
import {Button, View} from 'react-native';
import {chartData} from '../../chartData';
import DraggableComponents from './DraggableComponents';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type DashboardProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

/**
 * Dashboard component displaying stock chart and navigational button.
 * @param props - Props object with navigation of type NativeStackNavigationProp.
 * @returns JSX.Element
 */
const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const chartHtml = `
    <html>
    <head>
      <script src="https://code.highcharts.com/stock/highstock.js"></script>
      <script src="https://code.highcharts.com/modules/exporting.js"></script>
    </head>
    <body>
      <div id="container" style="width:100%; height:70vh;"></div>
      <script>
        document.addEventListener("DOMContentLoaded", function () {
          Highcharts.stockChart('container', {
           chart: {
            zoomType: 'y', 
          },
            rangeSelector: { selected: 1 },
            title: { text: 'Stock Price' },
            series: [{
              type: 'candlestick',
              name: 'Stock Data',
              data: ${JSON.stringify(chartData.data)},
              tooltip: { valueDecimals: 2 }
            }]
          });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{flex: 1}}>
      <DraggableComponents />
      <WebView
        originWhitelist={['*']}
        source={{html: chartHtml}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        style={{marginTop: 16}}
      />
      <View style={{marginBottom: 20}}>
        <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
      </View>
    </View>
  );
};

export default Dashboard;
