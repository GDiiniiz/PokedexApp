import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

interface modalProps {
  open: boolean;
  onClose: () => void;
  order?: boolean;
  onPress?: () => void;
}

export function ModalSearch({ open, onClose, order, onPress }: modalProps) {
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View>
        <TouchableOpacity
          style={{ backgroundColor: ' rgba(0, 0, 0, 0.4)', height: '100%' }}
          onPress={onClose}>
          <View>
            <View
              style={{
                position: 'absolute',
                width: 113,
                height: 132,
                top: 160,
                right: 0,
                margin: 16,
                backgroundColor: '#DC0A2D',
                borderRadius: 12,
              }}>
              <View style={{ alignItems: 'center', padding: 16 }}>
                <Text style={{ color: '#ffff', fontWeight: 'bold', fontSize: 20 }}>Sort by:</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ffff',
                  margin: 5,
                  borderRadius: 8,
                  padding: 12,
                  gap: 4,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <TouchableOpacity
                    onPress={onPress}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#DC0A2D',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={onPress}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 20,
                        borderWidth: !order ? 1 : 0,
                        borderColor: '#DC0A2D',
                        backgroundColor: !order ? '#DC0A2D' : '#ffff',
                      }}
                    />
                  </TouchableOpacity>
                  <Text>Number</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <TouchableOpacity
                    onPress={onPress}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: '#DC0A2D',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={onPress}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 20,
                        borderWidth: order ? 1 : 0,
                        borderColor: '#DC0A2D',
                        backgroundColor: order ? '#DC0A2D' : '#ffff',
                      }}
                    />
                  </TouchableOpacity>
                  <Text>Name</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
