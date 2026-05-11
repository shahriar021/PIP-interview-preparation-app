// CameraScreen.tsx
import React, { useRef, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const CameraScreen = () => {
    const navigation = useNavigation()
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)
    const { hasPermission, requestPermission } = useCameraPermission()
    const [flash, setFlash] = useState<'on' | 'off'>('off')

    React.useEffect(() => {
        if (!hasPermission) requestPermission()
    }, [])

    const capturePhoto = async () => {
        try {
            const photo = await camera.current?.takePhoto({
                flash,
            })
            if (photo) {
                // Go back and pass the photo uri
                navigation.navigate('CaseDetailsEdit', {
                    capturedPhoto: {
                        uri: `file://${photo.path}`,
                        name: `document_${Date.now()}.jpg`,
                        type: 'image/jpeg',
                    }
                })
            }
        } catch (error) {
            console.log("Capture error:", error)
        }
    }

    if (!hasPermission) return (
        <View style={styles.center}>
            <Text>No camera permission</Text>
        </View>
    )

    if (!device) return (
        <View style={styles.center}>
            <Text>No camera device found</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
            />

            {/* Top controls */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={32} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFlash(f => f === 'on' ? 'off' : 'on')}>
                    <Ionicons name={flash === 'on' ? 'flash' : 'flash-off'} size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* Capture button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.captureBtn} onPress={capturePhoto}>
                    <View style={styles.captureInner} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    topBar: {
        position: 'absolute', top: 50, left: 0, right: 0,
        flexDirection: 'row', justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    bottomBar: {
        position: 'absolute', bottom: 50, left: 0, right: 0,
        alignItems: 'center',
    },
    captureBtn: {
        width: 75, height: 75, borderRadius: 50,
        backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',
    },
    captureInner: {
        width: 60, height: 60, borderRadius: 50,
        backgroundColor: 'white', borderWidth: 2, borderColor: '#305FA1',
    }
})

export default CameraScreen