import React , {useState,useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Text, StatusBar, Button } from 'react-native';
import colors from './src/utils/colors';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

export default function App() {

  const [capital, setCapital] = useState(null);
  const [interes, setInteres] = useState(null);
  const [meses, setMeses] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
   if (capital && interes && meses) calcular();
   else reset();     
  }, [capital,interes,meses])

  const reset = ()=>{
    setErrorMessage(''),
    setTotal(null)
  }
  const calcular = ()=>{
    reset();
    if (!capital ) {
      setErrorMessage('Añade la cantidad que quieres solicitar');
    }else if (!interes) {
      setErrorMessage('Añade el interes del prestamo');
    }else if (!meses) {
      setErrorMessage('Selecciona los meses a pagar');
    }else{
      const i = interes / 100;
      const fee = capital / ((1 - Math.pow(i+1 , -meses))/ i);
      setTotal({
        monthlyFee: fee.toFixed(2).replace('.',','),
        totalPayable: (fee * meses).toFixed(2).replace('.',',')
      })
    }
  }
  return (
    <>
      <StatusBar barStyle='light-content'/>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background}></View>
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Form 
          setCapital={setCapital}
          setInteres = {setInteres}
          setMeses = {setMeses}
        />
      </SafeAreaView>

      <ResultCalculation
        capital={capital}
        interes={interes}
        meses={meses}
        total={total}
       errorMessage={errorMessage} />

      <Footer calcular = {calcular}></Footer>
      
    </>
  );
}

const styles = StyleSheet.create({

  safeArea:{
    height:290,
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    alignItems:'center',
  },
  background:{
    position: 'absolute',
    zIndex: -1,
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    width: '100%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
  },

  titleApp:{
    fontSize:25,
    fontWeight:'bold',
    color:'#fff',
    marginTop:30,
  }

});


