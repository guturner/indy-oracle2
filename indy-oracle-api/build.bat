./gradlew build || true
docker build -t gcr.io/third-anvil-135423/indy-oracle-api:1.0.2 .
docker push gcr.io/third-anvil-135423/indy-oracle-api:1.0.2