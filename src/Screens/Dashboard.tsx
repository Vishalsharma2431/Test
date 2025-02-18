import React from 'react';
import {WebView} from 'react-native-webview';
import {Button, View} from 'react-native';
import {chartData} from '../../chartData';
import DraggableComponents from './DraggableComponents';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type DashboardProps = {
  navigation: NativeStackNavigationProp<any, any>;
};

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const chartHtml = `
    <html>  
    <head>
      <script src="https://code.highcharts.com/stock/highstock.js"></script>
      <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
      <script src="https://code.highcharts.com/stock/indicators/indicators.js"></script>
      <script src="https://code.highcharts.com/stock/indicators/bollinger-bands.js"></script>
      <script src="https://code.highcharts.com/stock/indicators/price-channel.js"></script>
    </head>
    <body>
      <div id="container" style="width:100%; height:70vh;"></div>
      <script>
        document.addEventListener("DOMContentLoaded", function () {
         Highcharts.stockChart('container', {
        chart: {
            height: 600
        },
        title: {
            text: 'AAPL Historical'
        },
        subtitle: {
            text: 'All indicators'
        },
        accessibility: {
            series: {
                descriptionFormat: '{seriesDescription}.'
            },
            description: 'Use the dropdown menus above to display different ' +
                'indicator series on the chart.',
            screenReaderSection: {
                beforeChartFormat: '<{headingTagName}>' +
                    '{chartTitle}</{headingTagName}><div>' +
                    '{typeDescription}</div><div>{chartSubtitle}</div><div>' +
                    '{chartLongdesc}</div>'
            }
        },
        legend: {
            enabled: true
        },
        rangeSelector: {
            selected: 2
        },
        yAxis: [{
            height: '60%'
        }, {
            top: '60%',
            height: '20%'
        }, {
            top: '80%',
            height: '20%'
        }],
        plotOptions: {
            series: {
                showInLegend: true,
                accessibility: {
                    exposeAsGroupOnly: true
                }
            }
        },
        series: [{
            type: 'candlestick',
            id: 'aapl',
            name: 'AAPL',
            data: ${JSON.stringify(chartData.data)}
        }, {
            type: 'pc',
            linkedTo: 'aapl'
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
