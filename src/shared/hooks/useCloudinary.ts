
export function useCloudinary() {
    function openWidget(): Promise<{img: string, tmb: string}> {
        return new Promise((resolve) => {
            const uploadWidget = window.cloudinary.openUploadWidget({
                cloudName: 'dkndlz7a5',
                uploadPreset: 'ml_default',
                sources: ['url', 'local', 'camera']
            }, function (error: any, result: any) {
                if (!error && result.event === 'success') {
                    const img = result.info.url;
                    const tmb = result.info.thumbnail_url;
                    resolve({ img, tmb });
                    // setFormData(s => ({ ...s, img, tmb }))
                }
            })

            uploadWidget.open();
        })
    }

    return {
        openWidget
    }
}