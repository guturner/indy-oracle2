./gradlew build || true
docker build -t gcr.io/third-anvil-135423/indy-oracle-api:0.9.1 .
docker push gcr.io/third-anvil-135423/indy-oracle-api:0.9.1