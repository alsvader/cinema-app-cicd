resource "aws_s3_bucket" "cinemapp_s3_bucket" {
  bucket        = local.prefix
  force_destroy = true
  tags          = local.common_tags
}

resource "aws_s3_bucket_acl" "cinemapp_s3_bucket_acl" {
  bucket = aws_s3_bucket.cinemapp_s3_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "public_block" {
  bucket                  = aws_s3_bucket.cinemapp_s3_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}

resource "aws_s3_bucket_versioning" "cinemapp_s3_bucket_versioning" {
  bucket = aws_s3_bucket.cinemapp_s3_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_policy" "cinemapp_s3_bucket_policy" {
  bucket = aws_s3_bucket.cinemapp_s3_bucket.id
  policy = data.aws_iam_policy_document.cinemapp_s3_bucket_policy.json
}

data "aws_iam_policy_document" "cinemapp_s3_bucket_policy" {
  statement {
    actions = ["s3:GetObject"]

    resources = [
      aws_s3_bucket.cinemapp_s3_bucket.arn,
      "${aws_s3_bucket.cinemapp_s3_bucket.arn}/*"
    ]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.cinemapp_origin_access.iam_arn]
    }
  }
}

resource "aws_s3_bucket_website_configuration" "cinemapp_s3_bucket_website" {
  bucket = aws_s3_bucket.cinemapp_s3_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}