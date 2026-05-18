import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useCallback } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
} from 'react-native-vision-camera'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const CameraScreen = () => {
    const navigation = useNavigation()
    const route      = useRoute()
    const insets     = useSafeAreaInsets()

    // callback passed from EditProfile to receive the captured URI
    const { onCapture } = route.params as { onCapture: (uri: string) => void }

    // ── Camera setup ──────────────────────────────────────────────────────────
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('front')
    const device = useCameraDevice(cameraPosition)

    const { hasPermission } = useCameraPermission()
    const cameraRef = useRef<Camera>(null)

    // ── Capture state ─────────────────────────────────────────────────────────
    const [capturing, setCapturing] = useState(false)

    // ── Take photo ────────────────────────────────────────────────────────────
    const handleCapture = useCallback(async () => {
        if (!cameraRef.current || capturing) return

        try {
            setCapturing(true)
            const photo = await cameraRef.current.takePhoto({
                flash: 'off',
            })

            // photo.path is the full file path — prefix with file:// for RN Image
            const uri = `file://${photo.path}`

            onCapture(uri)           // ← send URI back to EditProfile
            navigation.goBack()      // ← return to EditProfile
        } catch (e) {
            console.error('Capture error:', e)
        } finally {
            setCapturing(false)
        }
    }, [capturing, onCapture])

    // ── Flip camera ───────────────────────────────────────────────────────────
    const handleFlip = () => {
        setCameraPosition(prev => prev === 'back' ? 'front' : 'back')
    }

    // ── Permission not granted ────────────────────────────────────────────────
    if (!hasPermission) {
        return (
            <View style={styles.centered}>
                <Text style={styles.permText}>Camera permission is required.</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // ── No device found ───────────────────────────────────────────────────────
    if (!device) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1C75AD" />
                <Text style={styles.permText}>Loading camera...</Text>
            </View>
        )
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <View style={styles.container}>

            {/* Full screen camera preview */}
            <Camera
                ref={cameraRef}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
            />

            {/* Top bar: close button */}
            <View style={[styles.topBar, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                    <Ionicons name="close" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* Bottom bar: flip + capture */}
            <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 20 }]}>

                {/* Flip camera */}
                <TouchableOpacity onPress={handleFlip} style={styles.iconBtn}>
                    <MaterialIcons name="flip-camera-ios" size={32} color="white" />
                </TouchableOpacity>

                {/* Capture button */}
                <TouchableOpacity
                    onPress={handleCapture}
                    disabled={capturing}
                    style={styles.captureOuter}
                    activeOpacity={0.8}
                >
                    <View style={styles.captureInner}>
                        {capturing
                            ? <ActivityIndicator size="small" color="#083D70" />
                            : null
                        }
                    </View>
                </TouchableOpacity>

                {/* Spacer to center the capture button */}
                <View style={{ width: 52 }} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        gap: 12,
    },
    permText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'robotoRegular',
    },
    backBtn: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#1C75AD',
        borderRadius: 10,
    },
    backBtnText: {
        color: 'white',
        fontFamily: 'robotoBold',
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconBtn: {
        width: 52,
        height: 52,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Outer ring (white border)
    captureOuter: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Inner filled circle
    captureInner: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default CameraScreen