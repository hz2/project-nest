

var Minio = require('minio')

    var minioClient = new Minio.Client({
        endPoint: '0xc8.com',
        port: 9000,
        useSSL: false,
        accessKey: 'ww2',
        secretKey: 'nFEMI/k4X8LpYz99CnhQkWiu/bPxY'
    });
  
    var file = './public.subscriber.ts'
  
    // Make a bucket called europetrip.
    minioClient.makeBucket('europetrip', 'us-east-1', function(err) {
        if (err) return console.log(err)
    
        console.log('Bucket created successfully in "us-east-1".')
    
        var metaData = {
            'Content-Type': 'application/octet-stream',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678
        }
        // Using fPutObject API upload your file to the bucket europetrip.
        minioClient.fPutObject('main', 'photos-europe.tar', file, metaData, function(err, etag) {
          if (err) return console.log(err)
          console.log('File uploaded successfully.')
        });
    });