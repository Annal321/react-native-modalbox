
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Keyboard, ImageBackground, ScrollView, TextInput, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import ModalBox from 'react-native-modalbox'
import MyApi from '../../api/MyApi'
import {Toast} from '../../components/Toast'
import {Foundation, RegExp } from '../../common'
import Screen, { IsIos } from '../../common/Screen';
import Loading from '../../components/NewLoading'
class ModalComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow',(frames)=>{
            this.setState({keyboardSpace: 1});
        });
        Keyboard.addListener('keyboardDidHide',(frames)=>{
            this.setState({keyboardSpace:0});
        });
        if(this.props.isVipMoal){
            this.refs.calendarstart.open();
        }
    }

    componentDidUpdate(){
        if(this.props.isVipMoal){
            this.refs.calendarstart.open();
        }
    }

    //关闭
    onRequestClose() {
        this.refs.calendarstart.close()
        this.props.callbackModal({ isVipMoal:false });
    }
    
    //开通会员
    onPressLearnMore() {
        this.props.callbackModal({ isVipMoal:false });
        this.props.navigation.navigate('Member')
    }
 
    render() {
        return (
            <ModalBox
                position="center"
                ref={"calendarstart"}
                isDisabled={false}
                swipeToClose={false}
                style={[styles.container,{top:IsIos && this.state.keyboardSpace?Screen.isResolution?-150:-110:0}]}
                animationDuration={0}
                backdropPressToClose={false}
                >
                <ImageBackground source={require('./images/bg.png')} style={styles.vip_bg}>
                    <TouchableHighlight
                        style={styles.clear_icon}
                        onPress={()=>{this.onRequestClose()}}>
                        <Image source={require('./images/xhz_remove.png')} style={styles.immedia}></Image>
                    </TouchableHighlight>
                    <View style={styles.vip_main}>
                        <Image source={require('./images/leftbg.png')} style={styles.main_icon}/>
                        <Text style={styles.mine_title}>该产品为VIP会员专享</Text>
                        <Image source={require('./images/rightbg.png')} style={styles.main_icon}/>
                    </View>
                    <Text style={styles.mine_txt}>开通会员享受更多会员权益</Text>
                    <TouchableOpacity
                        onPress={() => { this.onPressLearnMore() }}
                        style={styles.vipbtn}
                        >
                        <ImageBackground source={require('./images/btn.png')} resizeMode={'contain'} style={{width:195,height:59}}>
                            <Text style={styles.btn_text}>开通会员</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </ImageBackground>
            </ModalBox>
        );
    }
}
select = (state) => {
    return state.user
}
export default connect(select)(ModalComponent);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    vip_bg:{
        width: 306,
        height: 261
    },
    clear_icon:{
        padding: 5,
        alignSelf: 'center',
        marginLeft: 260,
        marginTop: 30
    },
    immedia:{
        width: 13,
        height: 13,
    },
    mine_title:{
        alignItems: 'center',
        color: '#8C573C',
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'System',
        paddingRight: 5,
        paddingLeft: 5
    },
    vip_main:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    main_icon:{
        width: 21,
        height: 2
    },
    mine_txt:{
        alignItems: 'center',
        color: '#B17254',
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 15
    },
    vipbtn:{
        width: 195,
        height: 40,
        marginLeft: '20%',
        marginTop: 40
    },
    btn_text:{
        color: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 18
    }
})