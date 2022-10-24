import formidable from "formidable";
import { createMediaFile } from "~~/server/db/mediaFiles";
import { createTweet } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { uploadToCloudinary } from "~~/server/utils/cloudinary";
import { NewTweet } from "~~/types";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise<{
    fields: formidable.Fields;
    files: formidable.Files;
  }>((resolve, reject) => {
    form.parse(event.req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  const userId = event.context?.auth?.user?.id;

  const tweetData: NewTweet = {
    text: fields.text as string,
    authorId: userId,
  };

  const replyTo = fields.replyTo;

  if (replyTo && replyTo !== "null" && replyTo !== "undefined") {
    tweetData.replyToId = replyTo as string;
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key] as formidable.File;

    const cloudinaryResource = await uploadToCloudinary(file.filepath);

    return createMediaFile({
      url: cloudinaryResource.secure_url,
      providerPublicId: cloudinaryResource.public_id,
      userId,
      tweetId: tweet.id,
    });
  });
  await Promise.all(filePromises);

  return { tweet: tweetTransformer(tweet) };
});
