import { Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as CropPicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useToast } from "react-native-toast-notifications";

// IMPORT RESOURCES
import { defaultImg } from "resources/img/defaultImg";

const ImagePicker = ({
  children,
  style,
  source,
  onOk = () => {},
  onLoad,
  ...props
}) => {
  const toast = useToast();
  const [status, requestPermission] = CropPicker.useMediaLibraryPermissions();
  const [image, setImage] = useState(source);

  useEffect(() => {
    setImage(source);
  }, [source]);

  const handleImagePicker = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        toast.show("권한이 없습니다.", { type: "warning" });
        return null;
      }
    }

    const result = await CropPicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      const resizedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      resizedImage.type = "image/jpeg";
      resizedImage.fileName = "image.jpg";

      await onOk(resizedImage);
      setImage(resizedImage.uri);
      return null;
    }
  };

  return (
    <Pressable style={{ ...style }} {...props} onPress={handleImagePicker}>
      <Image
        source={image ? { uri: image } : defaultImg.logo}
        style={{ ...style }}
        // onLoad={onLoad}
      />
      {children}
    </Pressable>
  );
};

export default ImagePicker;
