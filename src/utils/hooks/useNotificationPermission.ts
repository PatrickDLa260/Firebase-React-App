"use client";
import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from 'react-native';
//import { requestNotifications, checkNotifications, RESULTS } from 'react-native-permissions';

const useNotificationPermissionStatus = () => {
    if (Platform.OS === 'web') {
        const [permission, setPermission] = useState<NotificationPermission>("default");

        useEffect(() => {
            const handler = () => setPermission(Notification.permission);
            handler();
            Notification.requestPermission().then(handler);

            navigator.permissions
                .query({ name: "notifications" })
                .then((notifactionPerm) => {
                    notifactionPerm.onchange = handler;
                });
        }, []);

        return permission;
    }
    else if (Platform.OS === 'android') {
        try {
            PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
                response => {
                    if(!response){
                        PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS',{
                            title: 'Notification',
                            message:
                            'App needs access to your notification ' +
                            'so you can get Updates',
                            buttonNeutral: 'Ask Me Later',
                            buttonNegative: 'Cancel',
                            buttonPositive: 'OK',
                        })
                    }
                }
            ).catch(
              err => {
                console.log("Notification Error=====>",err);
              }
            )
          } catch (err){
            console.log(err);
          }
    //else if (Platform.OS === 'ios' || Platform.OS === 'android') {
        /* checkNotifications().then(({status, settings}) => {
            if (status === RESULTS.UNAVAILABLE || status === RESULTS.DENIED || status === RESULTS.LIMITED || status === RESULTS.BLOCKED) {
                requestNotifications(['alert', 'sound']).then(({status, settings}) => {

                })
            }
            else if (status === RESULTS.GRANTED) {
                status = "granted"
            }
            return status;
        }) */
    }
};

export default useNotificationPermissionStatus;