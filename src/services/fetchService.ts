class FetchService {
  static convertDataToFormData = (data: Record<string, string | Blob>) => {
    const iterableObject = Object.entries(data);
    const formData = new FormData();
    iterableObject.map(([key, value]) => formData.append(key, value));
    return formData;
  };
}

export default FetchService;
