output "cinemapp_bucket_name" {
  value = aws_s3_bucket.cinemapp_s3_bucket.id
}

output "cinemapp_cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.cinemapp_s3_distribution.id
}